/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { AudioManagerService } from '../audio-manager.service';
import { TabsServiceService } from '../tabs/tabs-service.service';
import { LocalNotificationService } from '../local-notification.service';
import { VolumeControlPlugin } from 'plugins/VolumeControlPlugin';
import { addDays, addHours, parseISO } from 'date-fns';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  title = 'Non ci sono nuovi ticket';
  message: string;
  newMessage = true;

  constructor(private tabsService: TabsServiceService,
              private audioManager: AudioManagerService,
              private notification: LocalNotificationService,
              private storage: StorageService
              ) {}

  ngOnInit(): void {
    if(this.tabsService.getNewMessage() === true){
      this.message = this.tabsService.getMessage();
      this.title = 'Ticket very high';
      this.newMessage = true;
    } else {
      this.message = '';
      this.title = 'Non ci sono nuovi ticket';
      this.newMessage = false;
    }
  }

  ionViewWillEnter(){
    if(this.tabsService.getNewMessage() === true){
      this.message = this.tabsService.getMessage();
      this.title = 'Ticket very high';
      this.newMessage = true;
    } else {
      this.message = '';
      this.title = 'Non ci sono nuovi ticket';
      this.newMessage = false;
    }
  }

  setReadMessage(){
    this.newMessage = false;
    this.tabsService.setNewMessage(false);
  }

  setUnreadMessage(){
    this.message = this.tabsService.getMessage();
    this.title = 'Ticket very high';
    this.newMessage = true;
  }

  // DEBUG PURPOSE

  setMaxVolume(){
    // VolumeControl.setMaxVolume({value: 'MY PLUGIN ACTIVATED'});
    VolumeControlPlugin.setMaxVolume();
  }
}
