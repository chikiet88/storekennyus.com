import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item1',
  templateUrl: './product-item1.component.html',
  styleUrls: ['./product-item1.component.scss']
})
export class ProductItem1Component implements OnInit {
  @Input() item
  rating3: number;

  constructor() { }

  ngOnInit(): void {
    this.rating3 = 3

  }

}
