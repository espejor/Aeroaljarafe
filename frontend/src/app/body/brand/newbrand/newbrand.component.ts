import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { Brand } from '../brand.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ImgcropperService } from '../../imgcropper/imgcropper.service';

@Component({
  selector: 'app-newbrand',
  templateUrl: './newbrand.component.html',
  styleUrls: ['./newbrand.component.css']
})
export class NewbrandComponent implements OnInit {
  brand: Brand = new Brand();

  image$ : Observable<any>
  image: File
  
  constructor(
    private brandService:BrandService, 
    private newRoute:Router,
    private imgCropperService:ImgcropperService
  ) { 
    // this.brand.brand=""
    // this.brand._id=""
    // this.brand.extension=""
  }


  ngOnInit() {
    this.image$ = this.imgCropperService.getImage$();
    this.image$.subscribe(image => this.image = image);
  }

  files:File[]
  
  private uploadImage(files:File[]){
    this.files = files
    $("#image-label").html(files[0].name)
  }

  saveBrand(form): void {

    let formData:FormData = new FormData(form); 
    formData.append("image",this.image,"image.png")

    this.brandService.newBrand(formData)
    .subscribe(res => {
      console.log(res)
      this.newRoute.navigate(['brands'])
    }, (err) => {
      console.log(err);
    })  
    console.log(this.image$)
    console.log(this.image)
  }






}
