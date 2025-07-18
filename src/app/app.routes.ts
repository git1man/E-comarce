import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { AddProductComponent } from './add-product/add-product.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AdminGuard } from './core/guards/admin.guard';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
export const routes: Routes = [
    
    { path: 'login', component: LoginComponent },

    {
        
  path: 'dashboard',
  loadComponent: () =>
    import('./admin-layout/admin-layout.component').then(c => c.AdminLayoutComponent),
  canActivate: [AdminGuard],children:[
    {path:'',loadComponent: ()=>import('./dashboard-home/dashboard-home.component').then(c=>DashboardHomeComponent)},
    {path: 'addProduct',loadComponent: () => import('./add-product/add-product.component').then(c=>AddProductComponent)},
    {path:'purchases',loadComponent: ()=>import('./purchase/purchase.component').then(c=>PurchaseComponent)},
    {path:'editProduct',loadComponent:()=>import('./edit-product/edit-product.component').then(c=>EditProductComponent)},
  ]
},
    {path:'',loadComponent:()=>import('./user-layout/user-layout.component').then(c=>UserLayoutComponent),children:[
        {path:'product',loadComponent:()=>import('./product/product-list/product-list.component').then(c=>ProductListComponent)},
        
    ]},
    { path: 'item/:id', loadComponent: () => import('./product/product.component').then(c => c.ProductComponent) },
    {path:'cart',loadComponent:()=>import('./cart/cart.component').then(c=>CartComponent)},
    // {path:'**',loadComponent:()=>import('./not-found/not-found.component').then(c=>NotFoundComponent)}


];
