import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskElement } from '../../modules/task-element';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'title',
    'user',
    'deadLineDate',
    'status',
    'actions',
  ];
  dataSource!: TaskElement[];
  tasksFilter!: FormGroup;
  page: any = 1
  total: any
  filtration: any = {
    page: this.page,
    limit: 3
  };
  timeOut: any;

  status: any = [{ name: 'Complete' }, { name: 'In-Progress' }];

  users: any = [
    { name: 'ali', id: '65a13e7945ee782f3e6468b9' },
    { name: 'ahmed', id: '65a13ebc45ee782f3e6468bc' },
  ];
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: TasksService,
    private toaster: ToastrService,
    private translate:TranslateService,
   ) {

    }

  ngOnInit(): void {
    this.getAllTasks();
  }

  selectUser(event: any) {
    this.page = 1
    this.filtration['page'] = 1
    this.filtration['userId'] = event.value;
    this.getAllTasks();
  }

  selectStatus(event: any) {
    this.page = 1
    this.filtration['page'] = 1
    this.filtration['status'] = event.value;
    this.getAllTasks();
  }

  selectDate(event: any, type: string) {
    this.page = 1
    this.filtration['page'] = 1
    this.filtration[type] = moment(event.value).format("DD-MM-YYYY")
    if(type === "toDate" && this.filtration["toDate"] !== "Invalid date"){
      this.getAllTasks()
    }
  }

  search(event: any) {
    this.page = 1
    this.filtration['page'] = 1
    this.filtration['keyword'] = event.value;
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.getAllTasks();
    }, 2000);
  }

  getAllTasks() {
    this.service.getAllTasks(this.filtration).subscribe(
      (res: any) => {
        this.dataSource = this.mappingTasks(res.tasks);
        this.total = res.totalItems
      }
    );
  }

  mappingTasks(data: any[]) {
    let newFormTasks = data.map((item) => {
      return {
        ...item,
        user: item.userId.username,
      };
    });

    return newFormTasks;
  }

  addTask() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '500px';
    dialogConfig.maxHeight = '90vh'; // Set the maximum height to 90% of the viewport height

    const dialogRef = this.dialog.open(AddTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllTasks();
    });
  }

  updateTask(dataTask: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '500px';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.data = dataTask;

    const dialogRef = this.dialog.open(AddTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllTasks();
    });
  }

  ConfirmDeleteTask(id: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '500px';
    dialogConfig.height = 'auto';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      type: "task",
      id
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllTasks();
    });
  }

  onTableDataChange(event : any){
    this.page = event
    this.filtration['page'] = event
    this.getAllTasks()
  }

}
