import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stringLength } from '@firebase/util';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent implements OnInit {
  id? : string;
  curSched : any;
  title : string;
  description : string;
  start : string;
  end : string;

  constructor(private router : Router, private dataService : DataService) {
    this.id = this.dataService.emp.id;
    this.curSched = this.dataService.sched;
    this.title = '';
    this.description = '';
    this.start = '';
    this.end = '';
  }

  ngOnInit(): void {
    if (!this.dataService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  saveEdit(e : any) {
    this.dataService.editSchedule(this.dataService.createSchedule(this.curSched.title, this.curSched.description, this.curSched.start_time, this.curSched.end_time));
  }

  deleteItem(i : string) {
    this.dataService.deleteSchedule(i);
  }

}
