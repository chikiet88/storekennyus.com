import { Component, OnInit } from "@angular/core";
import { BlogService } from "../blog.service";

@Component({
  selector: "app-blog-list",
  templateUrl: "./blog-list.component.html",
  styleUrls: ["./blog-list.component.scss"],
})
export class BlogListComponent implements OnInit {
  tintucs: any[];
  constructor(private _tintucService: BlogService) {}

  ngOnInit(): void {
    this._tintucService.getTintuc().subscribe();
    this._tintucService.tintucs$.subscribe((res) => {
      this.tintucs = res;
      console.log(res);
      
    });
  }
}
