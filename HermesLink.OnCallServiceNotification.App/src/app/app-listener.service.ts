/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { LocalNotificationService } from './local-notification.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppListenerService {

  constructor(
    private notification: LocalNotificationService,
    private storage: StorageService
  ) { }

  initAppListener(){
    App.addListener('appStateChange',async (isActive) => {
      if(isActive.isActive === true){/* Nothing to do when the app is on foreground, leave for testing purpose */}
      else {
        const scheduleSetted: boolean = await this.storage.getSetting('SCHEDULE_SET');
        if(scheduleSetted === false){
          this.notification.scheduleNotification(new Date(), 'Completa le impostazioni', 'Accedi per completare le impostazione relative all\'orario o non riceverai alcuna notifica');
        } else {
          this.notification.scheduleRecursiveNotification(new Date(), 'Ricorda di attivare le notifiche', 'Sei assegnato al servizio di reperibilità? Ricorda di attivare le notifiche allora');
        }
      }
    });
  }
}
