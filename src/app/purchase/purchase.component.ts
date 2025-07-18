import { Component ,OnInit} from '@angular/core';
import { PurchaseService } from '../core/services/purchases.service';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from '../shared/header-admin/header-admin.component';
import { FooterAdminComponent } from '../shared/footer-admin/footer-admin.component';
@Component({
  selector: 'app-purchase',
  imports: [CommonModule],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit{
  purchases: any[] = [];
  loading = false;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.fetchPurchases();
  }

  fetchPurchases(): void {
    this.loading = true;

    this.purchaseService.getAllUserPurchases().subscribe({
      next: (res) => {
        this.purchases = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch purchases', err);
        this.loading = false;
      }
    });
  }
}
