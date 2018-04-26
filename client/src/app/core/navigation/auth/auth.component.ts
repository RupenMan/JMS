import { DataService } from './../../services/data.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthModel } from './auth.model';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../auth/auth.service';
import { Credentials } from '../../../shared/models/credentials';


@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  model: AuthModel = new AuthModel();

  isAuthenticated: boolean = this._dataService.isAuthenticated();

  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private _dataService: DataService,
    private _authService: AuthService
  ) {}


  loginModal(loginModalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(loginModalTemplate);
  }

  registerModal(registerModalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(registerModalTemplate);
  }

  submitLogin(loginForm) {
    this._dataService.login(this.model);
    this._dataService.credentials.subscribe((credentials: Credentials) => {
      console.log(this._authService.getDecodedToken());
      // this._dataService.getApplicantInfo();
      this._dataService.getRecruiterInfo();
      this.modalRef.hide();
    }, console.error);
  }

  submitRegister(registerForm) {
    this._dataService.register(this.model);
    this._dataService.credentials.subscribe((credentials: Credentials) => {
      console.log(this._authService.getDecodedToken());
      this.modalRef.hide();
    }, console.error);
  }

  logout() {
    console.log('logout');
    this._dataService.logout();
    this.isAuthenticated = false;
  }

  goProfile() {
    console.log('goProfile');
    this._dataService.logout();
  }

  ngOnInit() {
  }

}
