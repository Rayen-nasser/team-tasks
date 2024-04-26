import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
export interface PeriodicElement {
  title: string;
  description: string;
  deadLineDate: string;
  status: string;
}


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

  dataSource!: any[];
  tasksFilter!: FormGroup;
  userDate!: any
  page: any = 1
  total: any = 0
  selectedStatus:string = "In-Progress"


  status: any = [
    { name: 'Complete', id: 1 },
    { name: 'In-Prossing', id: 2 },
  ];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: TasksService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.createform();
    this.getUserData()
    this.getAllTasks()
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title: [''],
      userId: [''],
      fromDate: [''],
      toDate: [''],
    });
  }

  getAllTasks() {
    let params = {
      //limit: 10,
      page: this.page,
      status: this.selectedStatus
    }
    this.service.getAll(this.userDate['userId'], params).subscribe((res: any) => {
      this.dataSource = res.tasks;
      this.total = res.totalItems
    });
  }

  getUserData(){
    let token = JSON.stringify(localStorage.getItem('tokenId'))
    this.userDate = JSON.parse(window.atob(token.split('.')[1]))
  }

  completeTask(idTask: string){
    const model = { id: idTask }
    this.service.complete(model).subscribe((res: any) => {
      this.toaster.success(res.massage)
      this.getAllTasks()
    })
  }



  changePage(event:any) {
    this.page = event
    this.getAllTasks()
  }
}
