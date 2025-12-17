import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pre-jogo',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './pre-jogo.html',
  styleUrls: ['./pre-jogo.css']
})
export class PreJogoComponent implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private platformId = inject(PLATFORM_ID);

userName: string | null = null;

ngOnInit() {
  if (!isPlatformBrowser(this.platformId)) return;

  authState(this.auth).subscribe(user => {
    if (user) {
      // Use displayName ao invés de email
      this.userName = user.displayName ?? user.email; // fallback para email se displayName estiver vazio
    } else {
      this.router.navigate(['/login']); // redireciona se não logado
    }
  });
}

  sair() {
    this.auth.signOut().then(() => {
      this.snackBar.open('Logout realizado com sucesso', 'Fechar', { duration: 3000 });
      this.router.navigate(['/login']);
    }).catch(err => {
      this.snackBar.open('Erro ao sair', 'Fechar', { duration: 3000 });
      console.error(err);
    });
  }
}
