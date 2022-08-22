import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username : string;
  password : string;

  constructor(private router : Router, private dataService : DataService) {
    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

  async employeeLogin() {
    // this.dataService.loadData();
    console.log("username: " + this.username)
    await this.dataService.checkLogin(this.username, this.password).then( (r) => {
      if (r) {
       
        this.dataService.setCurUserState(this.username).then( () => {
          console.log(this.dataService.getCurUserID());
          this.dataService.fetchSchedules(this.dataService.getCurUserID()!);
  
          this.router.navigate(['main-menu']);
          console.log(this.dataService.getHierarchy());
        })

      }
    })
  }

}
