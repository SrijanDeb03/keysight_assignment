import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';
import { OverviewComponent } from './product/overview/overview.component';
import { SpecsComponent } from './product/specs/specs.component';
import { ReviewsComponent } from './product/reviews/reviews.component';

const routes: Routes = [
  {path:'products',component: ProductsComponent},
  {path:'products/:id',component: ProductDetailComponent},
  {path:'product/nested/:id', 
   component:ProductComponent,
   children :[
      {path:'overview',component: OverviewComponent},
      {path:'specs',component: SpecsComponent},
      {path:'reviews',component: ReviewsComponent},
      {path:'',redirectTo:'overview', pathMatch:'full'} // default route
   ]},
   {path:'', redirectTo:'product/nested/1', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
