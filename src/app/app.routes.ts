import { Routes } from '@angular/router';
import { LayoutWebsiteComponent } from './components/layout/layout-website/layout-website.component';
import { LayoutAdminComponent } from './components/layout/layout-admin/layout-admin.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { UpdateProductComponent } from './pages/update-product/update-product.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutWebsiteComponent,
    children: [
      {path: 'product/:id', component:DetailProductComponent}
    ]
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    children: [
      {path: '', component: ManagerComponent},
      {path: 'add', component: ProductFormComponent},
      {path: 'update/:id', component: UpdateProductComponent}
    ]
  },
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];
