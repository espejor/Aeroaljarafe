import { Component, OnInit } from "@angular/core";
import { Plane } from "../plane.model";
import { PlaneService } from "../plane.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Option } from "src/app/interfaces/option.interface";
import { ModelService } from "../../model/model.service";
import { SelectOptionsComposingService } from "src/app/select-options-composing.service";
import { Observable } from "rxjs";
import { ImgcropperService } from "../../imgcropper/imgcropper.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-editplane",
  templateUrl: "./editplane.component.html",
  styleUrls: ["./editplane.component.css"]
})
export class EditplaneComponent implements OnInit {
  plane: Plane = new Plane();

  modelsOptions: Option[] = [];
  modelsSelected: string = "";

  image$: Observable<any>;
  image: File;

  popoverTitle = "Modificar la Aeronave";
  popoverMessage = "¿Está seguro que quiere modificar la Aeronave?";
  confirmText = "Modificar";

  constructor(
    private planeService: PlaneService,
    private route: ActivatedRoute,
    private modelService: ModelService,
    private newRoute: Router,
    private selectOptionsComposingService: SelectOptionsComposingService,
    private toastr: ToastrService,
    private imgCropperService: ImgcropperService
  ) {}

  ngOnInit() {
    this.image$ = this.imgCropperService.getImage$();
    this.image$.subscribe(image => (this.image = image));
    this.getPlane();
  }

  getPlane(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.planeService.getPlane(id).subscribe(
      data => {
        this.plane = data.plane;
        this.getModels();
      },
      err => {
        console.error(`Error code: ${err.status}\n${err.error.message}`);
      }
    );
  }

  getModels() {
    this.modelService.getModels().subscribe(data => {
      this.modelsOptions = this.selectOptionsComposingService.composeOptions(
        data.models,
        [this.plane.model._id]
      );
      this.modelsSelected = this.selectOptionsComposingService.setSingleSelectedOption(
        this.modelsOptions
      );
    });
  }



  savePlane(): void {
    let formData: FormData = new FormData();
    if (this.plane.plate) {
      formData.append("plate", this.plane.plate);
    }
    if (this.plane.model) {
      formData.append("model", this.modelsSelected);
    }
    if (this.image) {
      formData.append("image", this.image, this.image.name);
    }

    this.planeService.updatePlane(formData, this.plane._id)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success(
            `Se ha modificado el registro ${this.plane.model.brand.brand} ${this.plane.model.model} ${this.plane.plate}`,
            "¡OK!"
          );
          this.newRoute.navigate(["planes"]);
        },
        err => {
          console.error(`Error code: ${err.status}\n${err.error.message}`);
        }
      );
  }
}
