import { Component, OnInit } from '@angular/core';
import { TabsServiceService } from '../tabs/tabs-service.service';
import { StorageService } from '../storage.service';
import { WebApiService } from '../web-api.service';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { format, parseISO, formatISO } from 'date-fns';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  checked= [];
  startDateSet = false;
  startDate = formatISO(new Date());
  endDate = formatISO(new Date());
  private volume = 0;


  constructor(
    private tabsService: TabsServiceService,
    private storageService: StorageService,
    private api: WebApiService,
    private backgroundMode: BackgroundMode
  ) {}

  async ngOnInit(){
    this.storageService.getUserSetting('activate').then((response) => this.checked.push(response));
    this.startDateSet = await this.storageService.getSetting('IS_START_INITIALIZED');
    if(this.startDateSet === true){
      this.startDate = await this.storageService.getSetting('START_HOUR');
      const scheduleDone = await this.storageService.getSetting('SCHEDULE_SET');
      if(scheduleDone === true) {
        this.endDate = await this.storageService.getSetting('END_HOUR');
      }
    }
  }

  setAlarmStatus(){
    this.tabsService.setAlarmStatus(!this.checked[0]);
    this.storageService.setUserSetting('activate', !this.checked[0]);
    if(!this.checked[0] === false){
      this.backgroundMode.disable();
    } else {
      this.backgroundMode.enable();
    }
  }

  setAlarmVolume(){
    this.tabsService.setAlarmVolume(this.volume);
  }

  async checkNewMessage(){
    const response = await this.storageService.setUser('Michele', 'Presti', true, 'T1', 'presti.michele98@gmail.com');
  }

  async getInfo(){
    const response = await this.storageService.getUser();
  }

  async clearInfo(){
    this.storageService.clearInfo();
  }

  async setHour(event: string, type: string ){
    if(type === 'start'){
      this.startDateSet = true;
      await this.storageService.setSetting('START_HOUR', event);
      await this.storageService.setSetting('IS_START_INITIALIZED', true);
    } else if(type === 'end') {
      const value: string =  await this.storageService.getSetting('START_HOUR');
      const startHour: Date = parseISO(value);
      const endHour: Date = parseISO(event);
      if(endHour.getTime() <= startHour.getTime()){
        await this.storageService.setSetting('OVER_NIGHT', true);
      } else {
        await this.storageService.setSetting('OVER_NIGHT', false);
      }
      await this.storageService.setSetting('END_HOUR', event);
      await this.storageService.setSetting('SCHEDULE_SET', true);
    }
  }
}
