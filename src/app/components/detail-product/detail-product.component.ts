import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../models/product';
import { error } from 'console';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css',
})
export class DetailProductComponent implements OnInit {
  id: any;
  product!: IProduct;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id).subscribe({
        next: (data) => {
          if (!data) {
            this.router.navigate(['/not-found']);
          }else {
            this.getProduct(this.id);
          }
        },error: (error) => {
          this.router.navigate(['/not-found']);

        }
      });
    }
  }
  getProduct(id: string) {
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
      },
    });
  }
}
