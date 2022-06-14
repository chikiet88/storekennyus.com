import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { threadId } from "worker_threads";
import { DanhmucService } from "../../danhmuc/danhmuc.service";

@Component({
  selector: "app-popup-product",
  templateUrl: "./popup-product.component.html",
  styleUrls: ["./popup-product.component.scss"],
})
export class PopupProductComponent implements OnInit {
  rating3;
  danhmuc: any[];
  constructor(
    private _danhmucService: DanhmucService,
    public dialogRef: MatDialogRef<PopupProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.rating3 = 3;
    this._danhmucService.getDanhmuc().subscribe();
    this._danhmucService.danhmucs$.subscribe((res) => {
      res?.filter((x) => {
        if (x.id == this.data.dulieu.idDM) {
          this.data.dulieu.categories = x.Tieude;
        }
      });
    });
  }
}
