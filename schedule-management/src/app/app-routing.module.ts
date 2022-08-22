import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ResponsibleEmployeesComponent } from './responsible-employees/responsible-employees.component';
import { ScheduleItemComponent } from './schedule-item/schedule-item.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';

const routes: Routes = [
  // {path: "", redirectTo: "/home", pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'view-schedule', component: ViewScheduleComponent},
  {path: 'responsible-employees', component: ResponsibleEmployeesComponent},
  {path: 'schedule-item', component: ScheduleItemComponent},
  {path: 'main-menu', component: MainMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }