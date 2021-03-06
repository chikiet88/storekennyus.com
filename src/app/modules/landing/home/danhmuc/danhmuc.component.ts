import { Component, OnInit } from "@angular/core";
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { DanhmucService } from "./danhmuc.service";

@Component({
  selector: "app-danhmuc",
  templateUrl: "./danhmuc.component.html",
  styleUrls: ["./danhmuc.component.scss"],
})
export class DanhmucComponent implements OnInit {
  rating3: number;
  danhmucs: any[];
  minValue: number = 0;
  maxValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }
    },
  };
  typesOfShoes: string[] = [
    "Boots",
    "Clogs",
    "Loafers",
    "Moccasins",
    "Sneakers",
  ];
  constructor(private _danhmucService: DanhmucService) {
    this.rating3 = 3;
  }

  ngOnInit(): void {
    this._danhmucService.danhmucs$.subscribe((res) => (this.danhmucs = res));
  }
}
