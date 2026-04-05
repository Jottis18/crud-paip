import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { Produto } from '../produto';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css'
})
export class ListaProdutosComponent implements OnInit {
  private produtoService = inject(ProdutoService);

  produtos = signal<Produto[]>([]);
  carregando = signal(true);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.produtoService.listarProdutos().subscribe({
      next: (dados) => {
        this.produtos.set(dados);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao buscar produtos:', erro);
        this.carregando.set(false);
      }
    });
  }

  excluir(produto: Produto): void {
    if (produto.id == null) return;
    if (!confirm(`Excluir "${produto.nome}"?`)) return;

    this.produtoService.deletar(produto.id).subscribe({
      next: () => this.carregar(),
      error: (erro) => {
        console.error('Erro ao excluir:', erro);
        alert('Não foi possível excluir o produto.');
      }
    });
  }
}
