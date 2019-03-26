import { Component, OnInit } from '@angular/core';
import { PlaneService } from '../plane.service';
import { Plane } from '../plane.model';
import { Router } from '@angular/router';
import { Option } from 'src/app/interfaces/option.interface';
import { ModelService } from '../../model/model.service';
import { SelectOptionsComposingService } from 'src/app/select-options-composing.service';

@Component({
  selector: 'app-newplane',
  templateUrl: './newplane.component.html',
  styleUrls: ['./newplane.component.css']
})
export class NewplaneComponent implements OnInit {
  plane: Plane = new Plane();
  modelsOptions: Option[] =[]
  modelsSelected: boolean[] = [];

  constructor(
    private planeService:PlaneService, 
    private newRoute:Router,
    private modelService:ModelService,
    private selectOptionsComposingService:SelectOptionsComposingService) { 
      this.getModels()
  }

  ngOnInit() {
  }

  files:File[]
  
  private uploadImage(files:File[]){
    this.files = files
    $("#image-label").html(files[0].name)
  }


  getModels() {
    this.modelService.getModels().subscribe(data => {
      this.modelsOptions = this.selectOptionsComposingService.composeOptions(data.models,[""]);
    });
  }

  savePlane(form): void {

    let formData:FormData = new FormData(form); 

    this.planeService.newPlane(formData)
      .subscribe(res => {
        console.log(res)
        this.newRoute.navigate(['planes'])
      }, (err) => {
        console.log(err);
      })
  }
}
