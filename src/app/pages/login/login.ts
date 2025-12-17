import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, authState, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  private auth = inject(Auth);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  cadastro = false;
  loading = false;
  error: string | null = null;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit() {
    // Garantir que o código de auth só rode no navegador
    if (!isPlatformBrowser(this.platformId)) return;

    // Observa mudanças de autenticação
    authState(this.auth).subscribe(user => {
      if (user) {
        this.router.navigate(['/pre-jogo']);
      }
    });
  }

  async logarEmail() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = null;

    const { email, senha } = this.form.getRawValue();

    try {
      await signInWithEmailAndPassword(this.auth, email, senha);

      this.snackBar.open('Login realizado com sucesso', 'Fechar', { duration: 3000 });
      this.router.navigate(['/pre-jogo']);

    } catch (err: any) {
      this.error = err.message ?? 'Erro ao realizar login';
      this.snackBar.open(this.error ?? 'Erro desconhecido', 'Fechar', { duration: 4000 });
    } finally {
      this.loading = false;
    }
  }

  async logarGoogle() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.loading = true;
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);

      this.snackBar.open('Login com Google realizado com sucesso', 'Fechar', { duration: 3000 });
      this.router.navigate(['/pre-jogo']);
    } catch (err) {
      console.error(err);
      this.snackBar.open('Erro ao realizar login com Google', 'Fechar', { duration: 4000 });
    } finally {
      this.loading = false;
    }
  }

  exibirCadastro() { this.cadastro = true; }
  exibirLogin() { this.cadastro = false; }

  cadastrarEmail() {
    this.snackBar.open('Cadastro ainda não implementado', 'Fechar', { duration: 3000 });
  }
}
