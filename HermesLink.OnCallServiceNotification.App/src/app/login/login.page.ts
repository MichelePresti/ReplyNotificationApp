import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FcmService } from '../fcm.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private fcm: FcmService,
    private storage: StorageService
  ) { }

  ngOnInit() {
  }

  async register(form: NgForm) {
    await this.storage.setUser(form.value.name, form.value.surname, false, this.fcm.getToken(), form.value.email);
    await this.storage.setFirstRun(false);
    await this.storage.setSetting('IS_START_INITIALIZED', false);
    await this.storage.setSetting('SCHEDULE_SET', false);
    await this.storage.setSetting('CURRENT_NOTIFICATION_ID', 0);
    this.router.navigate(['']);
  }

}
