import { Component, OnInit } from "@angular/core";
import { BrandService } from "../brand.service";
import { Brand } from "../brand.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ImgcropperService } from "../../imgcropper/imgcropper.service";

@Component({
  selector: "app-editbrand",
  templateUrl: "./editbrand.component.html",
  styleUrls: ["./editbrand.component.css"]
})
export class EditbrandComponent implements OnInit {
  brand = new Brand();
  

  image$: Observable<any>;
  image: File;

  popoverTitle = "Modificar una Marca";
  popoverMessage = "¿Está seguro que quiere modificar la Marca?";
  confirmText = "Modificar";

  constructor(
    private brandService: BrandService,
    private route: ActivatedRoute,
    private newRoute: Router,
    private toastr: ToastrService,
    private imgCropperService: ImgcropperService
  ) {}

  ngOnInit() {
    this.image$ = this.imgCropperService.getImage$();
    this.image$.subscribe(image => (this.image = image));
    this.getBrand();
  }

  getBrand(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.brandService.getBrand(id).subscribe(
      brand => {
        this.brand = brand.brand;
        console.log(this.brand);
      },
      err => {
        console.error(`Error code: ${err.status}\n${err.error.message}`);
      }
    );
  }

  saveBrand(): void {
    let formData: FormData = new FormData();
    if (this.brand.brand) {
      formData.append("brand", this.brand.brand);
    }
    if (this.image) {
      formData.append("image", this.image, "image");
    }

    this.brandService.updateBrand(formData, this.brand._id).subscribe(
      res => {
        console.log(res);
        this.newRoute.navigate(["brands"]);
      },
      err => {
        console.error(`Error code: ${err.status}\n${err.error.message}`);
      }
    );

    this.toastr.success(
      `Se ha modificado el registro ${this.brand.brand}`,
      "¡OK!"
    );
  }
}
