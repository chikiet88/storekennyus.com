import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog/blog.service';

@Component({
    selector: 'app-gioithieu',
    templateUrl: './gioithieu.component.html',
    styleUrls: ['./gioithieu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GioithieuComponent implements OnInit {
    gioithieu: any;
    constructor(
        private _baivietService: BlogService,
        private _route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._baivietService.getTintucChitiet('gioithieu').subscribe();
        this._baivietService.tintuc$.subscribe((res) => {
          this.gioithieu = res
          console.log(res);
          
        });
    }
}
