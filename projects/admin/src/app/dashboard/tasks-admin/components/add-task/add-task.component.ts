import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog,
    private service: TasksService
  ) {}

  users: any = [
    { name: 'Moahmed', id: "65a13ebc45ee782f3e6468bc" },
    { name: 'Ali', id: "65a13e7945ee782f3e6468b9" },
  ];

  newTaskForm!: FormGroup;
  fileName=""

  ngOnInit(): void {
    this.initForm()

  }

  createTask(){
    let model =  this.preparedFormData()
    console.log(this.newTaskForm.value);

    this.service.addTask(model).subscribe(
      (res: any) => {
        console.log('The task has been created successfully');
      }
    )
  }

  preparedFormData(){
    let newTime = moment(this.newTaskForm.value["deadline"]).format('DD-MM-YYYY')
    let formData = new FormData()
    Object.entries(this.newTaskForm.value).forEach(([key, value] : any) => {
      if(key == "deadline"){
        formData.append(key, newTime)
      }else{
        formData.append(key, value)
      }
    })
  }

  onFileSelected(event: any): void {
    this.fileName = event.target.value
    this.newTaskForm.get('image')?.setValue(event.target.files[0]);
  }

    initForm() {
      this.newTaskForm = this.fb.group({
        title: ['',Validators.required],
        userId: ['', Validators.required],
        image: ['', Validators.required],
        description: ['', Validators.required],
        deadline: ['', Validators.required],
      });
    }
}
