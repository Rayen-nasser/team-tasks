import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../../tasks-admin/components/confirmation/confirmation.component';
export interface PeriodicElement {
  name: string;
  email: string;
  tasksAssigned: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  dataSource = [];
  constructor(
    private service: UsersService,
    private toaster: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(){
    this.service.getAll().subscribe((res: any) => {
      this.dataSource = res.users
    })
  }

  deleteUser(id : string){
    this.service.delete(id).subscribe((res: any) => {
      this.toaster.success(res.massage)
    })
  }

  ConfirmDeleteTask(id: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '500px';
    dialogConfig.height = 'auto';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      type: "user",
      id
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers();
    });
  }
}
