/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Vibration } from '@ionic-native/vibration/ngx';
import { AudioManagement } from '@ionic-native/audio-management/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { ForegroundService } from '@awesome-cordova-plugins/foreground-service/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { StorageService } from './storage.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeAudio, AudioManagement,
    Vibration,
    FCM,
    Platform,
    BackgroundMode,
    ForegroundService,
    InAppBrowser,
    StorageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
