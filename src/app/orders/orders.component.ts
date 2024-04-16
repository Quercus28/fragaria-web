import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Order } from '../model/order.interface';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule ,ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export default class OrdersComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  userData: any;
  orders: Order[] = [];
  successMessage = '¡Pedido confirmado! Gracias por elegirnos.';

  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');
    const userOrdersString = localStorage.getItem('userOrders')
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
    if (userOrdersString) {
      this.orders = JSON.parse(userOrdersString);
    }
  }

  backPage(): void {
    this.router.navigate(['/list-products']);
  }

  getTotal(): number {
    return this.orders.reduce((total, order) => total + (order.product.price * order.quantity), 0);
  }
}
