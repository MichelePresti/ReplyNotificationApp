/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HTTPResponse } from '@awesome-cordova-plugins/http/ngx';
import { Http, HttpOptions } from '@capacitor-community/http';
import { Timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class WebApiService {

  private newMessage: boolean;
  private lastUpdate = new Date().getTime();
  private newMessageUrl = 'http://localhost:5000/message';

  constructor() { }

  async doGetNewMessage(){
    const options = {
      url: this.newMessageUrl,
      headers: {
        'content-type': 'application/json',
        //'Access-Control-Allow-Origin': 'http://localhost:8100'
      },
      params: { size: 'XL' },
    };
    const result = [];
    await Http.get(options).then((httpResponse) => {
      if(httpResponse.status === 200){
        result.push(JSON.parse(httpResponse.data).new_email);
        result.push(JSON.parse(httpResponse.data).message);
      } else {
        this.handleResponse('');
      }
    });
    return result;
  }

  async postAck(){
    const option: HttpOptions = {
      url: this.newMessageUrl,
      headers: { 'content-type': 'application/json' },
      data: { ack: 'True' }

    };
    await Http.post(option);
  }

  async userRegistration(url_: string, name_: string, activate_: boolean, token_: string){
    const option: HttpOptions = {
      url: url_,
      headers: { 'content-type': 'application/json' },
      data: {
        name: name_,
        activate: activate_,
        token: btoa(token_)
      }
    };
    await Http.post(option);
  }

  handleResponse(data: any){
    return data;
  }
}
