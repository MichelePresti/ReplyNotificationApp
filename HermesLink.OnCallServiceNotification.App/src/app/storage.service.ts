/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})

class User{
  private name: string;
  private activate: boolean;
  private email: string;
  private token: string;

  constructor(name: string, activate: boolean, email: string, token: string){
    this.name = name;
    this.activate = activate;
    this.email = email;
    this.token = token;
  }

  getName(){
    return this.name;
  }

  getActivate(){
    return this.activate;
  }

  getEmail(){
    return this.email;
  }

  getToken(){
    return this.token;
  }

  setName(value: string){
    this.name = value;
  }

  setActivate(value: boolean){
    this.activate = value;
  }
  setEmail(value: string){
    this.email = value;
  }
  setToken(value: string){
    this.token = value;
  }
}
export class StorageService {

  constructor() { }

  async checkFirstRun(){
    const firstRun = [];
    await Storage.get({key: 'initialized'}).then((result) => firstRun.push(JSON.parse(result.value))).catch((err) => firstRun.push({}));
    return firstRun[0];
  }

  async setFirstRun(value: boolean){
    await Storage.set({key: 'initialized', value: JSON.stringify({
      initialized: value
    })});
  }

  async setUser(name_: string, surname_: string, activate_: boolean, token_: string, email_: string){
    await Storage.set({key: 'user', value: JSON.stringify({
      name: name_ + ' ' + surname_,
      activate: activate_,
      email: email_,
      token: token_
    })});
  }

  async getUser(){
    const user = [];
    await Storage.get({key: 'user'}).then((result) => user.push(JSON.parse(result.value))).catch((error) => {
      user.push({
        err: error
      })
    });
    return user[0];
  }

  async getUserSetting(key_: string){
    const value = [];
    await Storage.get({key: 'user'}).then((result) => value.push(JSON.parse(result.value))).catch((error) => {
      value.push({
        err: error
      })
    });
    switch(key_){
      case 'activate': return value[0].activate; break;
      case 'name': return value[0].name; break;
      case 'email': return value[0].email; break;
      case 'token': return value[0].token; break;
      default: return null;
    }
  }

  async setUserSetting(key_: string, value: any){
    const userList = [];
    await Storage.get({key: 'user'}).then((result) => userList.push(JSON.parse(result.value))).catch((error) => {
      userList.push({
        err: error
      })
    });
    const user: User = new User(userList[0].name, userList[0].activate, userList[0].email, userList[0].token);
    switch(key_){
      case 'activate': user.setActivate(value); break;
      case 'name': user.setName(value); break;
      case 'email': user.setEmail(value); break;
      case 'token': user.setToken(value); break;
      default: return null;
    }
    await Storage.set({key: 'user', value: JSON.stringify({
      name: user.getName(),
      activate: user.getActivate(),
      email: user.getEmail(),
      token: user.getToken()
    })});
  }

  async setSetting(key_: string, value_: any){
    await Storage.set({
      key: key_,
      value: JSON.stringify(value_)
    });
  }

  async getSetting(key_: string){
    const value = [];
    await Storage.get({key: key_}).then((result) => value.push(JSON.parse(result.value))).catch((error) => {
      value.push({
        err: error
      })
    });
    return value[0];
  }

  async clearInfo(){
    Storage.clear();
  }
}
