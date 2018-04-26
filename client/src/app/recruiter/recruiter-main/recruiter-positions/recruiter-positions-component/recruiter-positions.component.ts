import { Component, OnInit, ViewChild } from '@angular/core';
import { JobPosition } from '../../../../shared/models/jobPosition';

import { Recruiter } from '../../../recruiter';
import { DataService } from '../../../../core/services/data.service';
import { DatePipe } from '@angular/common';
import { Applicant } from '../../../../shared/models/applicant';


@Component({
  selector: 'jmsapp-recruiter-positions',
  templateUrl: './recruiter-positions.component.html',
  styleUrls: ['./recruiter-positions.component.scss']
})
export class RecruiterPositionsComponent implements OnInit {

  @ViewChild('myTable') table: any;

  expanded: any = {};
  timeout: any;

  public isCollapsed: false;
  public jobPositions: JobPosition[];
  public recruiter: Recruiter;
  constructor(private _dataService: DataService) {
    this._dataService.getRecruiterInfo();
    this._dataService.recruiter.subscribe(
      (data:Recruiter) => {
        this.jobPositions = data.positions;
        return true;
      },
      console.error,
      () => console.log("Positions.fetched")
    );
    // this.dataService.getJobPosition();
    // this.dataService.jobPosition.subscribe((response: JobPosition[]) => {
    //   console.log("jobs");
    //   this.jobPositions = response;
    // });
  }
  ngOnInit() {
    // this.getRecruitersInfo();
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  onValueChange(value) {
    console.log(value);
  }

}
