import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskElement } from '../../modules/task-element';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import * as moment from 'moment';
import { UsersService } from '../../../manage-users/services/users.service';

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
  page: any = 1;
  total: any;
  filtration: any = {
    page: this.page,
    limit: 3,
  };
  timeOut: any;

  status: any = [{ name: 'Complete' }, { name: 'In-Progress' }];

  users: any = [];
  
  constructor(
    public dialog: MatDialog,
    private serviceTasks: TasksService,
    private serviceUsers: UsersService
  ) {
    this.getDataFromSubject();
  }

  ngOnInit(): void {
    this.getAllTasks();
    this.getUsers();
  }

  selectUser(event: any) {
    this.page = 1;
    this.filtration['page'] = 1;
    this.filtration['userId'] = event.value;
    this.getAllTasks();
  }

  selectStatus(event: any) {
    this.page = 1;
    this.filtration['page'] = 1;
    this.filtration['status'] = event.value;
    this.getAllTasks();
  }

  selectDate(event: any, type: string) {
    this.page = 1;
    this.filtration['page'] = 1;
    this.filtration[type] = moment(event.value).format('DD-MM-YYYY');
    if (type === 'toDate' && this.filtration['toDate'] !== 'Invalid date') {
      this.getAllTasks();
    }
  }

  search(event: any) {
    this.page = 1;
    this.filtration['page'] = 1;
    this.filtration['keyword'] = event.value;
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.getAllTasks();
    }, 2000);
  }

  getAllTasks() {
    this.serviceTasks.getAllTasks(this.filtration).subscribe((res: any) => {
      this.dataSource = this.mappingTasks(res.tasks);
      this.total = res.totalItems;
    });
  }

  mappingTasks(data: any[]) {
    let newFormTasks = data.map((item) => {
      return {
        ...item,
        user: item.userId == null ? '' : item.userId.username,
      };
    });

    return newFormTasks;
  }

  addTask() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '500px';
    dialogConfig.maxHeight = '90vh';

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
    dialogConfig.data = { ...dataTask };

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
      type: 'task',
      id,
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllTasks();
    });
  }

  getUsers() {
    this.serviceUsers.getUsersData();
  }

  getDataFromSubject() {
    this.serviceUsers.userDate.subscribe((res: any) => {
      this.users = this.usersMapping(res.data);
    });
  }

  usersMapping(data: any[]) {
    let newArray = data?.map((item) => {
      return {
        name: item.username,
        id: item._id,
      };
    });
    return newArray;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.filtration['page'] = event;
    this.getAllTasks();
  }
}
