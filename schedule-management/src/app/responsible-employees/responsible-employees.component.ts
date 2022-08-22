import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

interface Employee {
	id? : string;
	title? : string;
	reports_to? : string;
	employeesArray? : Employee[];
	schedulesArray? : Schedule[];
}

interface Schedule {
	id: string;
	start_time: string;
	end_time: string;
	title: string;
	description: string;
}

const TREE_DATA: Employee[] = [];

@Component({
  selector: 'app-responsible-employees',
  templateUrl: './responsible-employees.component.html',
  styleUrls: ['./responsible-employees.component.scss']
})  

export class ResponsibleEmployeesComponent implements OnInit {
	schedules? : any[];
	index? : number;
	employees? : any[];

	userID : any;
	
	treeControl = new NestedTreeControl<Employee>(node => node.employeesArray);
	dataSource = new MatTreeNestedDataSource<Employee>();
  

	hasChild = (_: number, node: Employee) => !!node.employeesArray && node.employeesArray.length > 0;

  constructor(private router : Router, private dataService : DataService) { 
	// this.schedules = this.dataService.schedules;
	// this.employees = this.dataService.responsibleUsers;
	// this.index = 0;
	this.userID = this.dataService.getCurUserID();
	this.loadEmployees();
	this.dataSource.data = TREE_DATA;

  }

  ngOnInit(): void {
    if (!this.dataService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  	setIndex(i : number) {
		this.index = i;
	}

  	employeeClicked(e : any) {}

	loadEmployees() {
		// this.dataService.fetchAllUsers();
		console.log(this.dataService.getCurUserID());

		this.dataService.getHierarchy().then((newArr) => {
			console.log(newArr);
			for (let i = 0; i < newArr.length; i++) {
				if (newArr[i].id === '6C4E2C5D-BBBB-4386-AA71-B7F56727433C') {
					TREE_DATA.push(newArr[i]);
					console.log(newArr[i]);
					break;
				}
			}		

			

			console.log(TREE_DATA);
			this.dataSource.data = TREE_DATA;
			console.log(this.dataSource.data)
		})
		
	}

	viewEmployee(e : any) {}

}
