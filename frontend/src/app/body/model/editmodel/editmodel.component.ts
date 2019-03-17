import { Component, OnInit } from '@angular/core';
import { Model } from '../model.model';
import { ModelService } from '../model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Option } from 'src/app/interfaces/option.interface';
import { BrandService } from '../../brand/brand.service';
import { SelectOptionsComposingService } from 'src/app/select-options-composing.service';

@Component({
  selector: 'app-editmodel',
  templateUrl: './editmodel.component.html',
  styleUrls: ['./editmodel.component.css']
})
export class EditmodelComponent implements OnInit {
  model: Model;
  files:File[]
  brandsOptions: Option[] =[]
  brandsSelected: string = ""
  
  constructor(
    private modelService: ModelService, 
    private route: ActivatedRoute,
    private brandService:BrandService,
    private newRoute: Router,
    private selectOptionsComposingService:SelectOptionsComposingService) {
      this.getModel()
   }

  ngOnInit() {
  }


  
  private uploadImage(files:File[]){
    this.files = files
    $("#image-label").html(files[0].name)
  }

  getModel(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.modelService.getModel(id).subscribe(model => {
      this.model = model.model;
      this.getBrands()
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe(data => {
      this.brandsOptions = this.selectOptionsComposingService.composeOptions(data.brands,[this.model.brand._id]);
      this.brandsSelected = this.selectOptionsComposingService.setSingleSelectedOption(this.brandsOptions)
    });
  }

  saveModel(form): void {
    if (confirm("¿Estás seguro que deseas modificar el registro?")) {
      let formData:FormData = new FormData(form); 
      this.modelService.updateModel(formData,this.model._id).subscribe(res => {
        console.log(res)
        this.newRoute.navigate(['models'])
      });
    }
  }


}
