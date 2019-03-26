import { Component, OnInit } from "@angular/core";
import { Model } from "../model.model";
import { ModelService } from "../model.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Option } from "src/app/interfaces/option.interface";
import { BrandService } from "../../brand/brand.service";
import { SelectOptionsComposingService } from "src/app/select-options-composing.service";
import { Observable } from "rxjs";
import { ImgcropperService } from "../../imgcropper/imgcropper.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-editmodel",
  templateUrl: "./editmodel.component.html",
  styleUrls: ["./editmodel.component.css"]
})
export class EditmodelComponent implements OnInit {
  model: Model = new Model;

  brandsOptions: Option[] = [];
  brandsSelected: string = "";

  image$: Observable<any>;
  image: File;

  popoverTitle = "Modificar un Modelo";
  popoverMessage = "¿Está seguro que quiere modificar el Modelo?";
  confirmText = "Modificar";

  constructor(
    private modelService: ModelService,
    private route: ActivatedRoute,
    private brandService: BrandService,
    private newRoute: Router,
    private selectOptionsComposingService: SelectOptionsComposingService,
    private toastr: ToastrService,
    private imgCropperService: ImgcropperService
  ) {}

  ngOnInit() {
    this.image$ = this.imgCropperService.getImage$();
    this.image$.subscribe(image => (this.image = image));
    this.getModel();
  }

  getModel(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.modelService.getModel(id).subscribe(
      data => {
        this.model = data.model;
        this.getBrands();
      },
      err => {
        console.error(`Error code: ${err.status}\n${err.error.message}`);
      }
    );
  }

  getBrands() {
    this.brandService.getBrands().subscribe(data => {
      this.brandsOptions = this.selectOptionsComposingService.composeOptions(
        data.brands,
        [this.model.brand._id]
      );
      this.brandsSelected = this.selectOptionsComposingService.setSingleSelectedOption(
        this.brandsOptions
      );
    });
  }



  saveModel(): void {
    let formData: FormData = new FormData();
    if (this.model.model) {
      formData.append("model", this.model.model);
    }
    if (this.image) {
      formData.append("image", this.image, this.image.name);
    }

    this.modelService.updateModel(formData, this.model._id)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success(
            `Se ha modificado el registro ${this.model.brand.brand} ${this.model.model}`,
            "¡OK!"
          );
          this.newRoute.navigate(["models"]);
        },
        err => {
          console.error(`Error code: ${err.status}\n${err.error.message}`);
        }
      );
  }
}
