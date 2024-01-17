import { Component, OnInit } from '@angular/core';
import { ChangeStatus, UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../../tasks-admin/components/confirmation/confirmation.component';
import { MatChipsModule } from '@angular/material/chips';
import { ThemePalette } from '@angular/material/core';
export interface PeriodicElement {
  name: string;
  email: string;
  tasksAssigned: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'tasksAssigned',
    'actions',
  ];
  dataSource: any = [];
  total!: number;
  page: number = 1;
  filtration: any = {
    page: this.page,
    limit: 3,
  };
  pageSizeOptions!: any;
  isSubscribedToEmailsMessage = false;

  constructor(
    private service: UsersService,
    private toaster: ToastrService,
    public dialog: MatDialog
  ) {
    this.getDataFormSubject()
  }

  availableColors: any[] = [
    { name: 'none', color: undefined },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' },
  ];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.service.getUsersData(this.filtration)
    this.calculatePageSizeOptions();
  }

  getDataFormSubject(){
    this.service.userDate.subscribe((res:any) => {
      this.dataSource = res.data
      this.total = res.total
    })
  }

  ConfirmDeleteTask(id: any, index: number) {
    if(this.dataSource[index].assignedTasks > 0){
      this.toaster.error("You Can't Update This User Until Finish His Tasks");
    }else{
      const dialogConfig = new MatDialogConfig();

      dialogConfig.width = '500px';
      dialogConfig.height = 'auto';
      dialogConfig.disableClose = true;
      dialogConfig.data = {
        type: 'user',
        id,
      };
      const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        this.getUsers();
      });

    }
  }

  onTableDataChange(event: any) {
    console.log(event.pageIndex);

    this.page = event.pageIndex + 1; // Adjust if needed based on your API (0-based or 1-based)
    this.filtration.page = this.page;
    this.getUsers();
  }

  calculatePageSizeOptions() {
    const pageSizeFactor = 3; // Adjust this factor based on your business logic

    // Calculate pageSizeOptions based on the total number of items
    const maxPageSize = Math.ceil(this.total / pageSizeFactor);
    this.filtration.limit = maxPageSize; // Set the limit to the maximum possible value
    this.page = 1; // Reset the page to the first page

    // Generate pageSizeOptions array dynamically
    this.pageSizeOptions = Array.from(
      { length: maxPageSize },
      (_, index) => (index + 1) * pageSizeFactor
    );
  }

  toggleStatus(user: any, index: number) {
    const model: ChangeStatus = {
      id: user._id,
      status: user.status,
    };

    if (this.dataSource[index].assignedTasks > 0) {
      this.toaster.error("You Can't Update This User Until Finish His Tasks");
    } else {
      this.service.changeStatus(model).subscribe((res: any) => {
        this.toaster.success('User Status Updated Successfully');
        this.page = 1;
        this.getUsers();
      });
    }
  }

  search(event: any){
    this.page = 1
    this.filtration['page'] = 1

  }
}
