import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  loginForm?: FormGroup;
  errorMessage: string | null = null;

  users: any[] = [
    { email: 'admin@example.com', password: 'admin123', type: 'admin' },
    { email: 'user1@example.com', password: 'user123', type: 'client' },
    { email: 'user2@example.com', password: 'user456', type: 'client' },
  ];
  
  ngOnInit(): void {
    const newUserDataString = localStorage.getItem('userData');
    if (newUserDataString) {
      const newUserData = JSON.parse(newUserDataString);
      this.users.push(newUserData);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm!.valid) {
      const { email, password } = this.loginForm!.value;
      const userData = this.users.find(
        (u) => u.email === email && u.password === password
      );
      if (userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
        this.router.navigate(['/list-products']);
      } else {
        this.errorMessage = 'Credenciales incorrectas. Intente nuevamente.';
      }
    } else {
      this.errorMessage =
        'Datos inválidos. Complete el formulario correctamente.';
    }
  }

  registrePage(): void {
    this.router.navigate(['/create-account']);
  }
}
