import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookmarksService } from '../bookmarks.service';

@Component({
  selector: 'app-bookmark-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './bookmark-create.component.html',
  styleUrl: './bookmark-create.component.scss',
})
export class BookmarkCreateComponent {
  form: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookmarksService: BookmarksService,
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      url: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(https?:\/\/)?([\w\d-]+\.)+[\w-]{2,}(\/.*)?$/),
        ],
      ],
      category: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.error = 'Preencha todos os campos obrigatórios corretamente.';
      return;
    }
    this.error = null;
    this.bookmarksService.create(this.form.value).subscribe({
      next: () => this.router.navigate(['/bookmarks']),
      error: () => (this.error = 'Erro ao criar bookmark.'),
    });
  }

  onCancel(): void {
    this.router.navigate(['/bookmarks']);
  }
}
