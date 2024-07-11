import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';

const routes: Routes = [
  {path: 'admin/categories', component: CategoryListComponent}, //#35.Create Categories List Component and Routing
  {path: 'admin/categories/add', component: AddCategoryComponent} //#36.Create Add Category Component and Routing
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
