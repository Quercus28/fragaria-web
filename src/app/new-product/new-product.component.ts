import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../model/product.interface';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export default class NewProductComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);

  form?: FormGroup;
  product?: Product;
  userData: any;

  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.get(parseInt(id)).subscribe((product) => {
        this.product = product;
        this.form = this.formBuilder.group({
          name: [product.name, Validators.required],
          description: [product.description, Validators.required],
          price: [
            product.price,
            [Validators.required, Validators.pattern(/^\d*\.?\d{0,2}$/)],
          ],
          stock: [
            product.stock,
            [Validators.required, Validators.pattern(/^\d*$/)],
          ],
        });
      });
    } else {
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: [
          '',
          [Validators.required, Validators.pattern(/^\d*\.?\d{0,2}$/)],
        ],
        stock: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      });
    }
  }

  save() {
    if (this.form?.invalid) {
      return;
    }
    let request: Observable<Product>;
    const productForm = this.form!.value;
    if (this.product) {
      request = this.productService.update(this.product.id, productForm)
    } else {
      request = this.productService.create(productForm)
    }

    request.subscribe(() => {
      this.router.navigate(['/list-products']);
    });
  }

}
