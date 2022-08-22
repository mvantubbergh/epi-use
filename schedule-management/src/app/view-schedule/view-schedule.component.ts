import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

interface Schedule {
	id: any;
	start_time: string;
	end_time: string;
	title: string;
	description: string;
}

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.scss']
})

export class ViewScheduleComponent implements OnInit {

  curEmployee? : string;
  index : number;
  schedules : any[];
  s : Schedule;

  constructor(private dataService : DataService) { 
    this.curEmployee = dataService.emp.id;
    this.schedules = [];
    this.index = 0;
    this.s = {
      description : '',
      id : '',
      start_time : '',
      end_time : '',
      title : ''
    }

    this.loadSchedule();
  }

  ngOnInit(): void {
  }

  setIndex(i : number) {
		this.index = i;
	}

  loadSchedule() {
    // this.dataService.fetchSchedules(this.dataService.getCurUserID()!);
    // this.dataService.getSchedules();


    this.dataService.getSchedules().then((newArr) => {
      console.log(this.schedules);
      console.log(newArr[0]);

      console.log(newArr);
      
      for (let i = 0; i < newArr.length; i++) {		
					// this.schedules.push(newArr[i]);
					// console.log(newArr[i]);
          if (newArr[i]['id'] === this.dataService.getCurUserID()) {
            console.log(this.dataService.getCurUserID());
            

            this.s.description = newArr[i].description;
            this.s.title = newArr[i].title;
            this.s.start_time = newArr[i].start_time;
            this.s.end_time = newArr[i].end_time;
            this.s.id = newArr[i]['id'];

            this.schedules.push(this.s);
          }
		
			}		
    })

    console.log(this.schedules);
  }

  editSchedule(e : any) {
		this.dataService.editSchedule(e);
	}

	deleteSchedule(e : any) {
		this.dataService.deleteSchedule(e);
	}

  scheduleClicked(e : any) {

  }

}
