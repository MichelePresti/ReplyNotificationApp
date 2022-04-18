/* eslint-disable max-len */
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AudioManagerService } from './audio-manager.service';
import { FcmService } from './fcm.service';
import { LocalNotificationService } from './local-notification.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { AppListenerService } from './app-listener.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private fcmService: FcmService,
    private audio: AudioManagerService,
    private localNotification: LocalNotificationService,
    private storageService: StorageService,
    private router: Router,
    private backgroundMode: BackgroundMode,
    private appListener: AppListenerService
  ) {

    this.initializeApp();
    this.initAppListener();
  }

  initializeApp(){
    this.platform.ready().then(async ()=>{
      this.fcmService.initPush();
      this.localNotification.initLocalNotification();
      this.audio.preloadAudio(15);
      this.backgroundMode.enable();
      const firstRun = await this.storageService.checkFirstRun();
      if(firstRun === null  || (firstRun.initialized !== null && firstRun.initialized !== false)){
        this.router.navigate(['login']);
      }
    });
  }

  initAppListener(){
    this.appListener.initAppListener();
  }

}
