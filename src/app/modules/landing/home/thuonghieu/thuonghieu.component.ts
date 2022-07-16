import { Component, OnInit } from '@angular/core';
import { ThuonghieuService } from './thuonghieu.service';

@Component({
    selector: 'app-thuonghieu',
    templateUrl: './thuonghieu.component.html',
    styleUrls: ['./thuonghieu.component.scss'],
})
export class ThuonghieuComponent implements OnInit {
    thuonghieu: any[] = [];
    constructor(private _thuonghieuService: ThuonghieuService) {}
    selectThuonghieu(item) {
        localStorage.setItem('thuonghieu', JSON.stringify(item.id));
    }
    ngOnInit(): void {
        this._thuonghieuService.getThuonghieu().subscribe();
        this._thuonghieuService.thuonghieus$.subscribe(
            (res) => (this.thuonghieu = res)
        );
    }
}
