import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { IProduct } from '../../models/product';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'], // Corrected property name and value
})
export class ManagerComponent implements OnInit {
  products!: IProduct[];
  product!: IProduct;
  constructor(private productService: ProductService, private toastrService: ToastrService) {} // Corrected parameter name

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        // console.log(res);
      },
    });
  }
  deleteData(id: string | number) {
    this.productService.deleteProduct(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.toastrService.success("Product deleted successfully");
        console.log("abc");
        this.getAllData();
      },
    })
  }
  // loadProduct (data: IProduct){
  //   this.product = data;
  // }
}
