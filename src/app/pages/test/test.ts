import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-test',
  standalone: true,
  template: `
    <h1>Firebase Test</h1>
    <p>Status: {{ status }}</p>
  `
})
export class TestComponent implements OnInit {
  private auth = inject(Auth);
  status = 'Inicializando...';

  ngOnInit() {
    this.status = this.auth.currentUser
      ? 'Firebase conectado (usuário detectado)'
      : 'Firebase conectado (sem usuário logado)';
  }
}
