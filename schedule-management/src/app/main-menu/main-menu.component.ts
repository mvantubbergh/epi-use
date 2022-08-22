import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  userID? : string;

  constructor(private router : Router, private dataService : DataService) {
    this.userID = this.dataService.getCurUserID()!;
   }

  ngOnInit(): void {
    if (!this.dataService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  viewEmployees() {
    this.router.navigate(['responsible-employees']);
  }

  
  viewSchedules() {
    this.router.navigate(['view-schedule']);
  }

  
  logOut() {
    this.dataService.logOut();
    this.router.navigate(['login']);
  }
}
