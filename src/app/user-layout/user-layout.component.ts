import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderUserComponent } from '../shared/header-user/header-user.component';
import { FooterUserComponent } from '../shared/footer-user/footer-user.component';
import { ProductListComponent } from '../product/product-list/product-list.component';
@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet,HeaderUserComponent,FooterUserComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
