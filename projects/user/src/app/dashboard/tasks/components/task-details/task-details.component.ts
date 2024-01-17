import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  idTask: any
  task: any

  constructor(
    private service: TasksService,
    private activateRouter: ActivatedRoute,
    private Router: Router,
    private toaster: ToastrService
  ) {
    this.idTask = this.activateRouter.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    this.getTaskDetails()
  }

  getTaskDetails(){
    this.service.getTaskDetails(this.idTask).subscribe((res: any) => {
      this.task = res.tasks
    })
  }

  completeTask(idTask: string){
    const model = { id: idTask }
    this.service.complete(model).subscribe((res: any) => {
      this.toaster.success(res.massage)
      this.Router.navigate(['/tasks'])
    })
  }
}
