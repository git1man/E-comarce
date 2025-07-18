import { Component } from '@angular/core';
import { FooterAdminComponent } from '../shared/footer-admin/footer-admin.component';
import { HeaderAdminComponent } from '../shared/header-admin/header-admin.component';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin-layout',
  imports: [FooterAdminComponent,HeaderAdminComponent,RouterModule,RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
