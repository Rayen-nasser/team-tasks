import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material/material.module';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListTasksComponent,
    TaskDetailsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    TasksRoutingModule,
    MaterialModule,
    NgxPaginationModule
  ]
})
export class TasksModule { }
