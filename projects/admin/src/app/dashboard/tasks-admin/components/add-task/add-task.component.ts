import { Component, OnInit , Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import * as moment from 'moment';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../manage-users/services/users.service';
import { TasksService } from '../../services/tasks.service';
import { CreateTask } from '../../modules/create-task';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  fileName! : string
  newTaskForm!: FormGroup
  oldTaskForm!: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb:FormBuilder ,
    public dialog: MatDialogRef<AddTaskComponent> ,
    public matDialog:MatDialog,
    private service:TasksService,
    private toaster:ToastrService,
    private translate :TranslateService,
    ) { }

  users:any = [
    {name: "ali", id: "65a13e7945ee782f3e6468b9"},
    {name: "ahmed", id: "65a13ebc45ee782f3e6468bc"},
  ]
  ngOnInit(): void {
    console.log(this.data)
    this.createForm()
  }



  createForm() {
    this.newTaskForm = this.fb.group({
      title : [this.data?.title || "", [Validators.required , Validators.minLength(5)]],
      userId : [this.data?.userId._id || "", Validators.required],
      image : [this.data?.image || "", Validators.required ],
      description : [this.data?.description || "", Validators.required],
      deadline: [this.data ? new Date(this.data?.deadline.split('-').reverse().join('-')).toISOString() : "",  Validators.required]
    })
    this.fileName = this.data ?  this.data?.image : ""
    this.oldTaskForm = this.newTaskForm.value
  }


  selectImage(event:any) {
    this.fileName = event.target.value
    this.newTaskForm.get('image')?.setValue(event.target.files[0])
    console.log(this.newTaskForm.value);

  }

  createTask() {

    let model =  this.prepareFormData()
    this.service.addTask(model).subscribe(res => {
      this.toaster.success("Task Created Successfully" , "Success")
      this.dialog.close(true)
    })
  }

  updateTask(){

    let model =  this.prepareFormData()
    this.service.editTask(this.data._id ,model).subscribe(res => {
      this.toaster.success("Task Created Successfully" , "Success")
      this.dialog.close(true)
    })
  }



  prepareFormData() {
    let newData = moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY')
    let formData = new FormData()
    Object.entries(this.newTaskForm.value).forEach(([key , value] : any) => {

      if(key == 'deadline') {
        formData.append(key , newData)
      }else {
        formData.append(key , value)
      }

    })

    return formData
  }

  close(){
    let hasChange = false
    Object.keys(this.oldTaskForm).forEach((item) => {
      if(this.newTaskForm.value[item] !== this.oldTaskForm[item]){
        hasChange = true
      }
    })

    if(hasChange){
      const dialogRef = this.matDialog.open(ConfirmationComponent, {
        width: '750px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => { });
    }else{
      this.dialog.close();
    }
  }
}
