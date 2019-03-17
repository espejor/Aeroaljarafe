import { Component, OnInit } from "@angular/core";
import { BrandService } from "../brand.service";
import { Brand } from "../brand.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-editbrand",
  templateUrl: "./editbrand.component.html",
  styleUrls: ["./editbrand.component.css"]
})
export class EditbrandComponent implements OnInit {
  brand =  new Brand();
  files:File[]
  

  constructor(private brandService: BrandService, private route: ActivatedRoute,private newRoute: Router) {
    
  }

  ngOnInit() {this.getBrand();}

  
  private uploadImage(files:File[]){
    this.files = files
    $("#image-label").html(files[0].name)
  }

  getBrand(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.brandService.getBrand(id).subscribe(brand => {
      this.brand = brand.brand;
      console.log(this.brand);
    });
  }

  saveBrand(form): void {
    if (confirm("¿Estás seguro que deseas modificar el registro?")) {
      let formData:FormData = new FormData(form); 
      this.brandService.updateBrand(formData,this.brand._id).subscribe(res => {
        console.log(res)
        this.newRoute.navigate(['brands'])
      });
    }
  }
}
