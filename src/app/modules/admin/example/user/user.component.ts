import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'angular-notifier';
import { UserService } from './user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    private readonly notifier: NotifierService;
    users: any[];
    displayedColumns: string[] = ['name', 'SDT', 'email', 'Ngaytao'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(
        private _userService: UserService,
        notifierService: NotifierService // private _notifierService: NotifierService
    ) {
        this.notifier = notifierService;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngOnInit(): void {
        this._userService.getUsers().subscribe();
        this._userService.users$.subscribe((res) => {
            if (res) {
                this.users = res;
                this.dataSource = new MatTableDataSource(res);
            }
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
}
