import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../model/product.interface';
import { FormsModule } from '@angular/forms';
import { Order } from '../model/order.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export default class ProductsComponent implements OnInit{
  private productService = inject(ProductsService);
  showDiv: boolean = false;

  products: Product[] = [];
  orders: Order[] = []; 
  userData: any;
  successMessage = 'Producto añadido';

  ngOnInit(): void {
    this.loadUserData();
    this.loadProducts();
  }

  loadUserData(): void {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
  }

  loadProducts(): void {
    this.productService.list()
      .subscribe(products => {
        this.products = products;
      });
  }

  deleteProduct(product: Product): void {
    this.productService.delete(product.id)
      .subscribe(() => {
        this.loadProducts();
      });
  }

  increaseQuantity(id: number): void {
    const product = this.products.find(product => product.id === id);
    if (product && product.stock > 0) {
      product.quantity = (product.quantity || 0) + 1;
      product.stock--;
    }
  }

  decreaseQuantity(id: number): void {
    const product = this.products.find(product => product.id === id);
    if (product && product.quantity && product.quantity > 0) {
      product.quantity = Math.max((product.quantity || 0) - 1, 0);
      product.stock++;
    }
  }

  addToCart(id: number): void {
    const productToAdd = this.products.find(product => product.id === id);
    if (productToAdd) {
      const existingOrder = this.orders.find(order => order.product.id === id);
      if (existingOrder) {
        existingOrder.quantity++;
      } else {
        this.orders.push({ product: productToAdd, quantity: 1 });
      }
      localStorage.setItem('userOrders', JSON.stringify(this.orders));
      this.showSuccessAlert()
    }
  }

  showSuccessAlert() {
    const alertElement = document.getElementById('success-alert')?.style;
    if (alertElement) {
      alertElement.display = 'block';
      setTimeout(() => {
        alertElement.display = 'none';
      }, 2000);
    }
  }

}
