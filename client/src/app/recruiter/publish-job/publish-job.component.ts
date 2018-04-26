import { Component, OnInit, Input } from '@angular/core';
import { JobPosition } from '../../shared/models/jobPosition';
import { DataService } from '../../core/services/data.service';
import { BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
// import { Observable} from 'rxjs/Observable';
@Component({
  selector: 'jmsapp-publish-job',
  templateUrl: './publish-job.component.html',
  styleUrls: ['./publish-job.component.css']
})
export class PublishJobComponent implements OnInit {
  @Input() title;
  @Input() description;
  @Input() tags;
  constructor(private dataService: DataService,private router:Router) { }

  ngOnInit() {
  }

  createNewJob(){
    let newJob:JobPosition ={
      title: this.title,
      description: this.description,
      tags: this.tags,
      status:'Open',
      postDate: new Date()
    };
    this.dataService.createNewJob(newJob);
  }
  
  onSubmit(){
    this.router.navigateByUrl('/updateRecruiter');
    this.createNewJob();
  }
}
