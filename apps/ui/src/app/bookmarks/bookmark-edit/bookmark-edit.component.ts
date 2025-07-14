import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookmarksService } from '../bookmarks.service';

@Component({
  selector: 'app-bookmark-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bookmark-edit.component.html',
  styleUrl: './bookmark-edit.component.scss',
})
export class BookmarkEditComponent implements OnInit {
  form: FormGroup;
  error: string | null = null;
  bookmarkId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bookmarksService: BookmarksService,
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w\d-]+\.)+[\w-]{2,}(\/.*)?$/)]],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.bookmarkId = this.route.snapshot.paramMap.get('id');
    if (this.bookmarkId) {
      this.bookmarksService.get(this.bookmarkId).subscribe({
        next: (bm) => this.form.patchValue({
          title: bm.title,
          url: bm.url,
          category: bm.category ?? ''
        }),
        error: () => this.error = 'Erro ao carregar bookmark.'
      });
    }
  }

  submit(): void {
    if (this.form.invalid || !this.bookmarkId) {
      this.error = 'Preencha todos os campos obrigatórios corretamente.';
      return;
    }
    // Checagem extra: pelo menos um campo deve estar diferente do original
    const values = this.form.value;
    if (!values.title && !values.url && !values.category) {
      this.error = 'Nenhum campo foi alterado.';
      return;
    }
    this.error = null;
    this.bookmarksService.update(this.bookmarkId, values).subscribe({
      next: () => this.router.navigate(['/bookmarks']),
      error: () => this.error = 'Erro ao salvar alterações.'
    });
  }
}
