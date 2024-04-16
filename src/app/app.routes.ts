import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'list-products',
        loadComponent: () => import('./products/products.component')
    },
    {
        path: 'home',
        loadComponent: () => import('./login/login.component')
    },
    {
        path: '',
        loadComponent: () => import('./login/login.component')
    },
    {
        path: 'create-account',
        loadComponent: () => import('./create-account/create-account.component')
    },
    {
        path: 'new',
        loadComponent: () => import('./new-product/new-product.component')
    },
    {
        path: 'list-products/:id/edit',
        loadComponent: () => import('./new-product/new-product.component')
    },
    {
        path: 'orders',
        loadComponent: () => import('./orders/orders.component')
    },
    {
        path: 'cart',
        loadComponent: () => import('./cart/cart.component')
    }
];
