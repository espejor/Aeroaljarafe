import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListbrandsComponent } from './listbrands/listbrands.component';
import { EditbrandComponent } from './editbrand/editbrand.component';
import { NewbrandComponent } from './newbrand/newbrand.component';


const routes: Routes = [
  {path:'brands', component: ListbrandsComponent},
  //{path:'brand/show/:id', component: ShowbrandComponent},
  {path:'brand/edit/:id', component: EditbrandComponent},
  {path:'brands/new', component: NewbrandComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
