import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { Produto } from '../produto';

function produtoEmBranco(): Produto {
  return {
    nome: '',
    categoria: '',
    descricao: '',
    preco: 0,
    quantidadeEstoque: 0,
    codigoBarras: '',
    ativo: true
  };
}

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css'
})
export class ProdutoFormComponent implements OnInit {
  private produtoService = inject(ProdutoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  /** true = editar produto existente; false = cadastro novo */
  modoEdicao = false;
  /** Objeto ligado ao formulário; `ngModel` precisa de um objeto mutável assim. */
  model: Produto = produtoEmBranco();
  carregando = false;
  salvando = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicao = true;
      const id = Number(idParam);
      this.carregando = true;
      this.produtoService.buscarPorId(id).subscribe({
        next: (p) => {
          this.model = { ...p };
          this.carregando = false;
          this.cdr.markForCheck();
        },
        error: (erro) => {
          console.error(erro);
          this.carregando = false;
          alert('Produto não encontrado.');
          this.router.navigate(['/produtos']);
          this.cdr.markForCheck();
        }
      });
    }
  }

  salvar(): void {
    this.salvando = true;

    if (this.modoEdicao && this.model.id != null) {
      this.produtoService.atualizar(this.model.id, this.model).subscribe({
        next: () => {
          this.salvando = false;
          this.router.navigate(['/produtos']);
        },
        error: (erro) => {
          console.error(erro);
          this.salvando = false;
          alert('Erro ao atualizar.');
          this.cdr.markForCheck();
        }
      });
    } else {
      const { id: _omit, ...novo } = this.model;
      this.produtoService.criar(novo as Produto).subscribe({
        next: () => {
          this.salvando = false;
          this.router.navigate(['/produtos']);
        },
        error: (erro) => {
          console.error(erro);
          this.salvando = false;
          alert('Erro ao cadastrar.');
          this.cdr.markForCheck();
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/produtos']);
  }
}
