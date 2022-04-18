import { Injectable, OnInit } from '@angular/core';
import { AudioManagement } from '@ionic-native/audio-management/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AlertController } from '@ionic/angular';
import { VolumeControlPlugin } from 'plugins/VolumeControlPlugin';

@Injectable({
  providedIn: 'root'
})
export class AudioManagerService{

  public alertMode: any;
  private audioLevel = 15;


  constructor(
    private nativeAudio: NativeAudio,
    private audio: AudioManagement,
    private vibration: Vibration,
    private alert: AlertController
  ) {}

  preloadAudio(volume: number){
    this.nativeAudio.preloadComplex('A1', 'assets/music/Alarm.mp3', volume/this.audioLevel, 1, 0.2);
  }

  setAudioVolume(volume: number){
    this.nativeAudio.setVolumeForComplexAsset('A1',volume);
  }
  playAudio(){
    VolumeControlPlugin.setMaxVolume();
    this.nativeAudio.play('A1');
    this.showAlert();
  }

  stopAudio(){
    this.nativeAudio.stop('A1');
  }

  async showAlert() {
    const cancelAlert = await this.alert.create({
      header: 'Nuova e-mail',
      message: "C'è una nuova e-mail da controllare, accedi a replyams.dev@gmail.com per leggerla. Premi Stop per spegnere l'audio",
      buttons: [
        {
          text: 'Stop',
          cssClass: 'stop-music-button',
          handler: async () => {
            this.nativeAudio.stop('A1');
            cancelAlert.dismiss();
          }
        }
      ]
    });
    cancelAlert.present();
  }

}
