import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;
    this.auth.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = 'Email ou senha inválidos';
      },
    });
  }
}
