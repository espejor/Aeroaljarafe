import { Component, OnInit } from "@angular/core";
import { BrandService } from "../brand.service";
import { Brand } from "../brand.model";

@Component({
  selector: "app-listbrands",
  templateUrl: "./listbrands.component.html",
  styleUrls: ["./listbrands.component.css"]
})
export class ListbrandsComponent implements OnInit {
  brands: Brand[];
  constructor(private brandService: BrandService) {}

  ngOnInit() {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(data => {
      console.log(data.brands);
      this.brands = data.brands;
    });
  }

  deleteBrand(id:string) {
    if (confirm("¿Estás seguro que deseas eliminar el registro?")) {
      this.brandService.deleteBrand(id).subscribe(data => {
        console.log(data)
        this.deleteElementFromBrands(data.brand)
      }, (err) => {
        console.log(err);
      })
    }
  }

  private deleteElementFromBrands(brand: Brand) {
    console.log(JSON.stringify(brand));
    var i = this.findIndex(this.brands, brand);
    this.brands.splice(i, 1);
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
