import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-more-love",
  templateUrl: "./more-love.component.html",
  styleUrls: ["./more-love.component.scss"],
})
export class MoreLoveComponent implements OnInit {
  @Input() item;
  constructor() {}

  ngOnInit(): void {}
}
