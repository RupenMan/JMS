import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import {AuthService} from  '../../auth/auth.service';

@Component({
  selector: 'jmsapp-update-recruiter',
  templateUrl: './update-recruiter.component.html',
  styleUrls: ['./update-recruiter.component.css']
})
export class UpdateRecruiterComponent implements OnInit {
  jwtInfo;
  recruiter_id:string;
  name:string;
  address: string;
  contact:string;
  userWebLink:string;
  email:string;
  fullImagePath:string;

  selectedFile:File = null;
  constructor(private _dataService: DataService,private _authService: AuthService) { 
    this.fullImagePath = "/assets/images/profile.png";
  }
  
  ngOnInit() {
    this.jwtInfo = this._authService.getDecodedToken();
    console.log(this.jwtInfo);
  }

  onSubmit(){
    // const fd = new FormData();
    // fd.append('image',this.selectedFile,this.selectedFile.name); 
    console.log(this.jwtInfo.role);
    let body = {
      recruiter_id:this.jwtInfo._id,
      name: this.name,
      address: this.address,
      contact: this.contact,
      webLink: this.userWebLink,
      email: this.email,
      logoURL:""
    };
    // this._dataService.createRecruiter(body);
    this._dataService.updateRecruiter(body);
  }
  
  getImage(event){
    // console.log(event);
    // this.selectedFile = event.target.files[0];
  }
}
