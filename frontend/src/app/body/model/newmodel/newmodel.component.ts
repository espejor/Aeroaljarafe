import { Component, OnInit } from '@angular/core';
import { ModelService } from '../model.service';
import { Model } from '../model.model';
import { Router } from '@angular/router';
import { Option } from 'src/app/interfaces/option.interface';
import { BrandService } from '../../brand/brand.service';
import { SelectOptionsComposingService } from 'src/app/select-options-composing.service';

@Component({
  selector: 'app-newmodel',
  templateUrl: './newmodel.component.html',
  styleUrls: ['./newmodel.component.css']
})
export class NewmodelComponent implements OnInit {
  model: Model = new Model();
  brandsOptions: Option[] =[]
  brandsSelected: boolean[] = [];

  constructor(
    private modelService:ModelService, 
    private newRoute:Router,
    private brandService:BrandService,
    private selectOptionsComposingService:SelectOptionsComposingService) { 
      this.getBrands()
  }

  ngOnInit() {
  }

  files:File[]
  
  private uploadImage(files:File[]){
    this.files = files
    $("#image-label").html(files[0].name)
  }


  getBrands() {
    this.brandService.getBrands().subscribe(data => {
      this.brandsOptions = this.selectOptionsComposingService.composeOptions(data.brands,[""]);
    });
  }

  saveModel(form): void {

    let formData:FormData = new FormData(form); 

    this.modelService.newModel(formData)
      .subscribe(res => {
        console.log(res)
        this.newRoute.navigate(['models'])
      }, (err) => {
        console.log(err);
      })
  }
}
