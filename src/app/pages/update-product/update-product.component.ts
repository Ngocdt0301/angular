import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { IProduct } from '../../models/product';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent implements OnInit {
  product: IProduct;
  productForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(productId);
    if (productId) {
      this.productService.getProduct(productId).subscribe({
        next: (data) => {
          // console.log(data);
          this.product = data;
        },
      });
    } else {
      this.router.navigate(['/not-found']);
    }
  }
  updateProduct() {
    this.productService.updateProduct(this.product).subscribe({
      next: (res) => {
        this.product = res;
        this.toastr.success("Update Successfully !!");
        this.router.navigate(['/admin'])
      }
    })
  }
}
