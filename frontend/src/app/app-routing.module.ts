import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './body/main/main.component';


const routes: Routes = [
  {path:'', component: MainComponent},
  {path: '**',redirectTo: 'not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      { enableTracing: true } // <-- debugging purposes only
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
