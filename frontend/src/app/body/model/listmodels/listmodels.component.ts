import { Component, OnInit } from "@angular/core";
import { ModelService } from "../model.service";
import { Model } from "../model.model";

@Component({
  selector: "app-listmodels",
  templateUrl: "./listmodels.component.html",
  styleUrls: ["./listmodels.component.css"]
})
export class ListmodelsComponent implements OnInit {
  models: Model[];
  constructor(private modelService: ModelService) {}

  ngOnInit() {
    this.getModels();
  }

  getModels() {
    this.modelService.getModels().subscribe(data => {
      console.log(data.models);
      this.models = data.models;
    });
  }

  deleteModel(id:string) {
    if (confirm("¿Estás seguro que deseas eliminar el registro?")) {
      this.modelService.deleteModel(id).subscribe(data => {
        console.log(data)
        this.deleteElementFromModels(data.model)
      }, (err) => {
        console.log(err);
      })
    }
  }

  private deleteElementFromModels(model: Model) {
    console.log(JSON.stringify(model));
    var i = this.findIndex(this.models, model);
    this.models.splice(i, 1);
  }

  private findIndex(array: any[], item: any): number {
    var i = 0;
    for (i; i < array.length; i++) {
      if (array[i]._id == item._id) {
        return i;
      }
    }
    return -1;
  }
}
