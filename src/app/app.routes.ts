import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { TestComponent } from './pages/test/test';
import { PreJogoComponent } from './pages/pre-jogo/pre-jogo';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponent },
  { path: 'pre-jogo', component: PreJogoComponent },
];
