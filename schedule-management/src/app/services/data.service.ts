declare var require: any;

import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import * as bcrypt from 'bcryptjs';


interface Employee {
	id? : string;
	title? : string;
	reports_to? : string;
	employeesArray? : Employee[];
	schedulesArray? : Schedule[];
}

interface Schedule {
	id: any;
	start_time: string;
	end_time: string;
	title: string;
	description: string;
}

@Injectable({
	providedIn: 'root'
})

export class DataService {
	responsibleUsers : any[];
	rsCount : any;
	curUserState : any;
	schedules : any[];
	sched : Schedule;
	emp : Employee;
	scheduleID : any;
	success : boolean;
	loginFailed : boolean;
	employeesArrays : any[];
	schedulesArrays : any[];

	// registered_users = JSON STRING FOR REGISTERED USERS
	// system data = JSON STRING FOR ALL SCHEDULES AND EMPLOYEES

	constructor(private firestore : Firestore) {
		this.responsibleUsers = [];
		this.rsCount = 0;
		this.curUserState = '';
		this.schedules = [];
		this.sched = {} as Schedule;
		this.sched.description = '';
		this.sched.id = '';
		this.sched.start_time = '';
		this.sched.end_time = '';
		this.employeesArrays = [];
		this.schedulesArrays = [];

		this.emp = {} as Employee;
		this.emp.id = '';
		this.emp.title = '';
		this.emp.reports_to = '';
		// this.emp.employeesArray = [];

		this.scheduleID = '';
		this.success = false;
		this.loginFailed = false;
	}

	async loadData() {
		// let obj = JSON.parse(this.system_data);
		// let allUsers = obj.system_data;

		// let emplArr = allUsers.employees;
		// let schedArr = allUsers.schedules;

		// console.log(emplArr);

		// for (let index = 0; index < emplArr.length; index++) {
		// 	let curData = {
		// 		reports_to : emplArr[index].reports_to,
		// 		title : emplArr[index].title,
		// 		schedule : schedArr[index].schedule
		// 	}

		// 	await setDoc(doc(this.firestore, "system_data", emplArr[index].id), curData)
		// }
	}

	async setCurUserState(s  : string) {
		this.curUserState = s;
		const q = query(collection(this.firestore, "registered_users"), where("username", "==", s));

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(async (doc) => {
			this.emp.id = doc.data()['id'];
			// console.log(this.emp.id);
			localStorage.setItem("uID", this.emp.id!);
			// console.log("localID: " + localStorage.getItem("uID"));			
			this.emp.reports_to = doc.data()['reports_to'];
		});
	}

	getCurUserID() {
		return localStorage.getItem("uID");
	}

	logOut() {
		localStorage.setItem("loggedIn", "false");
	}

	isLoggedIn() {
		if (localStorage.getItem("loggedIn") == "true") return true;
		return false;
	}

	async checkLogin(u : string, p : string) {
		const q = query(collection(this.firestore, "registered_users"), where("username", "==", u));

		// const bcrypt = require('bcrypt');

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(async (doc) => {
		  // doc.data() is never undefined for query doc snapshots
		  if (await bcrypt.compare(p, doc.data()['password'])) {
			console.log('true');
			localStorage.setItem("loggedIn", "true");
			return true;
		  }
		else {
			console.log('false');
			return false;
		} 
		});
		return true;
		// console.log('false user');
		// return false;
	}

	async createHierarchy() {
		// get first employee's schedule, add to his schedule
		// go through employees, find where reports_to is equal to current employee
		// fetch all their schedules, add it to their objects
		// add these employees to current user's employees[] array
		// pass this array to recursive function 

		
		
	}

	async fetchAllUsers() {
		const colRef = collection(this.firestore, 'users');
		const usersSnap = await getDocs(colRef);

		let users = [];
		usersSnap.forEach(doc => {
			const u = {} as Employee
			u.id = doc.data()['id'];
			u.reports_to = doc.data()['reports_to'];
			u.title = doc.data()['title'];

			users.push(u);
		})
	}

	async getHierarchy() {
		const q = query(collection(this.firestore, "system_data"));
		const querySnap = await getDocs(q);

		querySnap.forEach((doc) => {
			let SE : Employee = {
				title : doc.data()['title'],
				schedulesArray : doc.data()['schedule'],
				reports_to : doc.data()['reports_to'],
				id : doc.id,
				employeesArray : []
			}
			this.employeesArrays.push(SE);
		});

		this.employeesArrays.forEach(CE => {
			const NI = CE.id;
			this.employeesArrays.forEach(SC => {
				if (SC.reports_to === NI) CE.employeesArray.push(SC);
			})
		})

		console.log(this.employeesArrays);
		return this.employeesArrays;
	}

	async getSchedules() {
		const q = query(collection(this.firestore, "system_data"));
		const querySnap = await getDocs(q);

		querySnap.forEach((doc) => {
			for (let i = 0; i < doc.data()['schedule'].length; i++) {
				let SS : Schedule = {
					title : doc.data()['schedule'][i]['title'],
					description : doc.data()['schedule'][i]['description'],
					// id : i.toString(),
					id : doc.id,
					start_time : doc.data()['schedule'][i]['start_time'],
					end_time : doc.data()['schedule'][i]['end_time'],
				}
				this.schedulesArrays.push(SS);
			}
		});

		this.schedulesArrays.forEach(SE => {
			const NI = SE.id;
			this.employeesArrays.forEach(SC => {
				if (SC.reports_to === NI) SE.schedulesArrays.push(SC);
			})
		})

		console.log(this.schedulesArrays);
		return this.schedulesArrays;
	}


	//old
	async fetchSchedules(id : string) {
		this.schedules = [];
		console.log("id here: " + id);
		const curUserRef = doc(this.firestore, 'system_data', id)
		const curUserSnap = await getDoc(curUserRef)

		const q = query(collection(this.firestore, "system_data"), where("reports_to", "==", id));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(async (doc) => {
			this.emp.employeesArray?.push(doc.data());
		})
		
		this.popRecursive(this.emp);

		console.log(this.emp);


		// if (curUserSnap.exists()) {
		// 	const responsible_schedules_array = curUserSnap.data()['schedules'];

		// 	responsible_schedules_array.forEach(async (id: string) => {
		// 		try {
		// 			const scheduleSnap = await getDoc(doc(this.firestore, 'schedules', id));
		// 			const s = {} as Schedule;
					
		// 			s.description = curUserSnap.data()['description'];
		// 			s.title = curUserSnap.data()['title'];
		// 			s.start_time = curUserSnap.data()['start_time'];
		// 			s.end_time = curUserSnap.data()['end_time'];
		// 			s.id = curUserSnap.data()['id'];

		// 			this.schedules.push(s);
		// 		} catch(e) {
		// 			console.error(e);
		// 		}
		// 	}).catch((e: any) => {
		// 		console.error(e);
		// 	})
		// } else {
		// 	console.log('No schedules found for this user!');
		// }
	}

	popRecursive(e : Employee) {
		e.employeesArray?.forEach(async element => {
			const q = query(collection(this.firestore, "system_data"), where("reports_to", "==", e.id));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(async (doc) => {
				e.employeesArray?.push(doc.data());
				this.popRecursive(element);
			})
		})
	}

	editSchedule(e : Schedule) {
		this.sched.description = e.description;
		this.sched.id = e.title;
		this.sched.start_time = e.start_time;
		this.sched.end_time = e.end_time;
		this.sched.title = e.title;
		this.scheduleID = e.id;

		this.saveEdit();
	}

	createSchedule(t : string, d : string, s : string, e : string) {
		const newSched = {} as Schedule;

		newSched.title = t;
		newSched.description = d;
		newSched.start_time = s;
		newSched.end_time = e;

		return newSched;
	}

	async saveEdit() {
		const scheduleRef = doc(this.firestore, 'schedules', this.scheduleID);

		await updateDoc(scheduleRef, {
			title : this.sched.title,
			id : this.sched.id,
			start_time : this.sched.start_time,
			end_time : this.sched.end_time,
			description : this.sched.description
		})
	}

	async saveSchedule() {

	}

	async deleteSchedule(id : string) {
		await deleteDoc(doc(this.firestore, 'system_data', id));
	}
}
