import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  @Output() onCloseModel = new EventEmitter();
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private ProductService: ProductService, private toastrService: ToastrService, private router: Router) {
    this.productForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }
  onClose() {
    this.onCloseModel.emit(false);
  }
  onSubmit() {
    if (this.productForm.valid) {
      this.ProductService.createProduct(this.productForm.value).subscribe({
        next:(response => {
          this.toastrService.success("Add product successfully")
          this.onClose();
          this.router.navigate(['/admin'])
        })
      })
    } else {
      this.productForm.markAllAsTouched(); // clear
    }
  }
}
