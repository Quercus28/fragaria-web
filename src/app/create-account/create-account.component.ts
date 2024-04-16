import { Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export default class CreateAccountComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  form?: FormGroup;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  

  save(): void {
    if (this.form?.valid) {
      const userData = this.form.value;
      userData.type = 'client';
      localStorage.setItem('userData', JSON.stringify(userData));
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Datos inválidos. Complete el formulario correctamente.';
    }
  }

  
  backPage(): void {
    this.router.navigate(['/home']);
  }
}
