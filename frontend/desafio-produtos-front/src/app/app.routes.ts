import { Routes } from '@angular/router';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos';
import { ProdutoFormComponent } from './produto-form/produto-form';

export const routes: Routes = [
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },
  { path: 'produtos', component: ListaProdutosComponent },
  { path: 'produtos/novo', component: ProdutoFormComponent },
  { path: 'produtos/:id/editar', component: ProdutoFormComponent }
];
