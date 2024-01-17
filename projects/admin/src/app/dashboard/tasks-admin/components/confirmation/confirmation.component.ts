import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '../../../manage-users/services/users.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private toaster:ToastrService,
    private dialog: MatDialogRef<ConfirmationComponent>,
    private matDialog: MatDialog,
    private translate :TranslateService,
    private serviceUser:UsersService,
    private serviceTask:TasksService,
  ) { }

  ngOnInit(): void {
  }

  confirmDelete() {

    if(this.data.type == "user"){
        this.serviceUser.delete(this.data.id).subscribe((res: any) => {
          this.toaster.success(res.massage)
          this.dialog.close(true)
        })

    }else{

      this.serviceTask.deleteTask(this.data.id).subscribe(
        (res:any) => {
          this.toaster.success(res.massage)
          this.dialog.close(true)
        }
      )
    }

  }

  closeOnlyDialogConfirm(){
    this.dialog.close()
  }

  closeAll(){
    this.matDialog.closeAll()
  }
}
