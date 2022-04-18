import { Injectable } from '@angular/core';
import { AlarmStatus } from '../alarm-status';

@Injectable({
  providedIn: 'root'
})
export class TabsServiceService {

  alarmConfig: AlarmStatus = {
    alarmActivated: false,
    alarmVolume:0,
    alarmAudioID: 'Audio1'
  };

  newMessage: boolean;
  title: string;
  message: string;

  constructor() { }

  getAlarmStatus(): boolean{
    return this.alarmConfig.alarmActivated;
  }

  getAlarmVolume(): number{
    return this.alarmConfig.alarmVolume;
  }

  getAlarmAudioID(): string{
    return this.alarmConfig.alarmAudioID;
  }

  setAlarmStatus(status: boolean){
    this.alarmConfig.alarmActivated = status;
  }
  setAlarmVolume(volume: number): void{
    this.alarmConfig.alarmVolume = volume;
  }

  setNewMessage(flag: boolean): void{
    this.newMessage = flag;
  }

  getNewMessage(): boolean{
    return this.newMessage;
  }

  getMessage(): string{
    return this.message;
  }

  setMessage(message: string): void{
    this.message = message;
  }


}
