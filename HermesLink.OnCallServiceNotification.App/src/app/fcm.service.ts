import { Injectable } from '@angular/core';
import { PushNotifications, Token, ActionPerformed, PushNotificationSchema } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { AudioManagerService } from './audio-manager.service';
import { TabsServiceService } from './tabs/tabs-service.service';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { LocalNotificationService } from './local-notification.service';
import { AlertController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { WebApiService } from './web-api.service';
import { FCM } from '@capacitor-community/fcm';
import { Storage } from '@capacitor/storage';
import { StorageService } from './storage.service';
import { parseISO, addDays} from 'date-fns';
@Injectable({
  providedIn: 'root'
})
export class FcmService {

  private token = '';
  constructor(
    private audio: AudioManagerService,
    private tabsService: TabsServiceService,
    private backgroundMode: BackgroundMode,
    private notification: LocalNotificationService,
    private alert: AlertController,
    private iab: InAppBrowser,
    private router: Router,
    private webApi: WebApiService,
    private storage: StorageService
  ) {}

  initPush(){
    if(Capacitor.getPlatform() !== 'web'){
      this.registerPush();
    }
  }

  registerPush(){
    const userToken = [];
    PushNotifications.requestPermissions().then(async (permission) => {
      if(permission.receive /*=== 'granted'*/){
        PushNotifications.register().then(() => {
          FCM.subscribeTo({topic: 'alert'});
        });
      } else {}

      await PushNotifications.addListener('registration', (token: Token) => {
        userToken.push(JSON.stringify(token));
        //
        // Registration Token Log for testing purpose
        // console.log('Registration token: ', JSON.stringify(token.value));
      });
      this.token = userToken[0];
      PushNotifications.addListener('registrationError', err => {
        //
        // Registration Error handler
        // version 0.0.1.0 not implemented
      });
      PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
        this.storage.getUserSetting('activate').then(async (setting) => {
          if(setting === true){
            const validDate = await this.checkDate();
            if( validDate === true){
              this.tabsService.setNewMessage(true);
              this.tabsService.setMessage(atob(notification.data.message));
              this.audio.playAudio();
              this.notification.scheduleInstantNotification(1, notification.data.title, atob(notification.data.message));
            }
          }
        });
      });
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        async (notification: ActionPerformed) => {
          //
          // Push notification action perfomed handler
          // version 0.0.1.0 not implemented
        });
    });

  }

  async checkDate(): Promise<boolean>{
    const scheduleSet = await this.storage.getSetting('SCHEDULE_SET');
    if(scheduleSet === false){
      return false;
    }
    else {
      const currentDate = new Date();
      const dateContainer: any = await this.getNormalizedDate(currentDate);
      const startDate: Date = dateContainer.startDate;
      const endDate: Date = dateContainer.endDate;
      if(currentDate.getTime() >= startDate.getTime() && currentDate.getTime() <= endDate.getTime()){
        return true;
      } else {
        return false;
      }
    }
  }

  async getNormalizedDate(currentDate: Date){
    const startDateSaved: Date = parseISO(await this.storage.getSetting('START_HOUR'));
    const endDateSaved: Date = parseISO(await this.storage.getSetting('END_HOUR'));
    const isOverNight = await this.storage.getSetting('OVER_NIGHT');
    let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), startDateSaved.getHours(), startDateSaved.getMinutes());
    let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), endDateSaved.getHours(), endDateSaved.getMinutes());
    if(isOverNight === true && currentDate.getHours() < endDate.getHours()){
      startDate = addDays(startDate, -1);
    } else if(isOverNight === true && currentDate.getHours() > endDate.getHours()){
      endDate = addDays(endDate, 1);
    } else if(isOverNight === true && currentDate.getHours() === endDate.getHours()){
      if(currentDate.getMinutes() <= endDate.getMinutes()){
        startDate = addDays(startDate, -1);
      } else {
        endDate = addDays(endDate, 1);
      }
    }
    return {
      currentDate,
      startDate,
      endDate
    };
  }

  getToken(){
    return this.token;
  }
}
