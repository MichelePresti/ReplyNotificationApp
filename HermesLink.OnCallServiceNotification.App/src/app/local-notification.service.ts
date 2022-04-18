import { Injectable } from '@angular/core';
import { LocalNotifications, LocalNotificationSchema, ScheduleOptions } from '@capacitor/local-notifications';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { Router } from '@angular/router';
import { parseISO, addMinutes } from 'date-fns';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  constructor(
    private backgroundMode: BackgroundMode,
    private router: Router,
    private storage: StorageService
  ) { }

  async scheduleInstantNotification(time: number, title_: string, body_: string) {
    const ID = await this.storage.getSetting('CURRENT_NOTIFICATION_ID') + 1;
    const options: ScheduleOptions = {
      notifications: [{
        id: ID,
        title: title_,
        body: body_
      }]
    };
    LocalNotifications.schedule(options);
    this.storage.setSetting('CURRENT_NOTIFICATION_ID', ID);
  }

  async scheduleNotification(date: Date, title_: string, msg: string) {
    const ID = await this.storage.getSetting('CURRENT_NOTIFICATION_ID') + 1;
    const options: ScheduleOptions = {
      notifications: [{
        id: ID,
        title: title_,
        body: msg,
        schedule: {
          at: date
        }
      }],
    };
    LocalNotifications.schedule(options);
    this.storage.setSetting('CURRENT_NOTIFICATION_ID', ID);
  }

  async scheduleRecursiveNotification(date: Date, title_: string, msg: string) {
    const ID = await this.storage.getSetting('CURRENT_NOTIFICATION_ID') + 1;
    const options: ScheduleOptions = {
      notifications: [{
        id: ID,
        title: title_,
        body: msg,
        schedule: {
          repeats: true,
          every: 'day',
          on: {
            hour: 18
          }
        }
      }],
    };
    LocalNotifications.schedule(options);
    this.storage.setSetting('CURRENT_NOTIFICATION_ID', ID);
  }

  initLocalNotification() {
    LocalNotifications.addListener('localNotificationReceived', (notification) => {
      //
      // Local Notification Received handler
      // version 0.0.1.0 not implemented
    });
    LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
      //
      // Local Notification Action Performed handler
      // version 0.0.1.0 not implemented
    });
  }
}
