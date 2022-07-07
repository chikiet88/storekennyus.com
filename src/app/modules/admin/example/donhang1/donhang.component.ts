import { AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

import { map } from 'rxjs';
import { DonhangService } from './donhang.service';
import { SanphamService } from '../sanpham/sanpham.service';
@Component({
    selector: 'app-donhang',
    templateUrl: './donhang.component.html',
    styleUrls: ['./donhang.component.scss'],
    encapsulation:ViewEncapsulation.None
})
export class DonhangComponent implements AfterViewInit, OnInit {
    displayedColumns: string[] = [ 'idNhanvien','idKH', 'Hoten', 'SDT', 'Diachi'];
  
    trangthai: any[] = [
        { id: 1, title: 'New' },
        { id: 2, title: 'Đơn Rác' },
        { id: 3, title: 'Trùng Đơn' },
        { id: 4, title: 'Nhận Đơn' },
        { id: 5, title: 'Hủy Đơn' },
    ];
    isOpen = false;
    CDonhang:any;
    DonHangs:any[]=[];
    products;
    // displayedColumns: string[] = [
    //     'idDH',
    //     'hovaten',
    //     'phone',
    //     'TenSP',
    //     // 'status',
    //     'price',
    // ];
    users = {'51ccb531-c131-497e-b8f8-b7eec027c83b':"Test1",'72b693af-0dde-4654-9492-1d159e911a42':"Test2"}
    landingpageForm: FormGroup;
    selectRow;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource<any>;
    triggerOrigin;
    constructor(
        private fb: FormBuilder,
        private donhangService: DonhangService,
        private _sanphamService: SanphamService
    ) {}

    onSelect(item) {
        this.selectRow.trangthai = item.id;
        this.isOpen = false;
        this.donhangService.updateDonhang(this.selectRow).subscribe();
    }
    SelectDonhang(item)
    {
        this.donhangService.getDonhangchitiet(item.id).subscribe((data)=>
        {
            this.CDonhang = data;
        }

        );
       
    }
    ngAfterViewInit(): void {}
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    toggle(trigger: any, row) {
        this.selectRow = row;
        this.triggerOrigin = trigger;
        this.isOpen = !this.isOpen;
    }

    ngOnInit(): void {
        this._sanphamService.getProduct().subscribe();
        this._sanphamService.products$.subscribe(
            (res) => (this.products = res)
        );
        this.donhangService.getDonhang().subscribe();
        this.donhangService.donhang$.subscribe((res) => {
            
            if(res){
                for (let i = 0; i <= this.products?.length; i++) {
                    for (let j = 0; j <= res?.length; j++) {
                        if (this.products[i]?.id == res[j]?.idP) {
                            let a = this.products[i]?.Tieude
                            if(res[j]){
                                Object.assign(res[j], {
                                    tenSp: a,
                                });
                            }
                            
                        }
                    }
                }
            }
            this.DonHangs = res;
            this.dataSource = new MatTableDataSource(res);
            console.log(res);

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
}
