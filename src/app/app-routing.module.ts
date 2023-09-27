import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { SupportComponent } from './support/support.component';
import { AboutComponent } from './about/about.component';
import { FormsComponent } from './forms/forms.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'products', component: ProductsComponent},
  {path:'forms', component: FormsComponent},
  {path:'support', component: SupportComponent},
  {path:'about', component: AboutComponent},
  {path:'', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
