import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sanpham-daxem',
  templateUrl: './sanpham-daxem.component.html',
  styleUrls: ['./sanpham-daxem.component.scss']
})
export class SanphamDaxemComponent implements OnInit {
  products
  constructor() { }

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem("sanphamdaxem")) || [];

  }

}
