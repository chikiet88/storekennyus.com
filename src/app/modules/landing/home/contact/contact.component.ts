import { Component, OnInit } from "@angular/core";
import { HomeService } from "../home.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  cauhinh;
  constructor(private _homeService: HomeService) {}

  ngOnInit(): void {
    this._homeService.getCauhinh().subscribe();
    this._homeService.cauhinh$.subscribe((res) => {

      if(res){
      this.cauhinh = res[0];

      }
    });
  }
}
