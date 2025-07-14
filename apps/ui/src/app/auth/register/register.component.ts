import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.error = 'Preencha todos os campos corretamente.';
      return;
    }
    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.error = 'As senhas não coincidem.';
      return;
    }
    this.error = null;
    const { name, email, password } = this.form.value;
    this.auth.register(name, email, password).subscribe({
      next: () => {
        this.auth.login(email, password).subscribe(() => {
          this.router.navigate(['/bookmarks']);
        });
      },
      error: (err) => {
        this.error = err?.error?.message || 'Erro ao registrar usuário.';
      },
    });
  }
}
