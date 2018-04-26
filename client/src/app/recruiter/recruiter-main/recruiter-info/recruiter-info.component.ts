import { Component, OnInit } from '@angular/core';
import { Recruiter } from '../../recruiter';
import { Address } from '../../../shared/models/address';
import { DataService } from '../../../core/services/data.service';
import { PublishJobComponent } from '../../publish-job/publish-job.component';


@Component({
  selector: 'jmsapp-recruiter-info',
  templateUrl: './recruiter-info.component.html',
  styleUrls: ['./recruiter-info.component.css']
})
export class RecruiterInfoComponent implements OnInit {
  recruiter: Recruiter;
  fullImagePath:string;
  constructor(private dataService: DataService) {
    this.fullImagePath = "/assets/images/profile.png";
  }
  
  ngOnInit() {
    this.dataService.getRecruiterInfo();
    this.dataService.recruiter.subscribe(
      (response:Recruiter) => {
        console.log("Recruiter",response);
        this.recruiter=response;
        this.fullImagePath = this.recruiter.logoURL || this.fullImagePath;
        // console.log("True Recruiter", this.recruiter);
    },
      err => console.error(err)
    );
  }
}
