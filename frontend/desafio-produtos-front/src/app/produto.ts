export interface Produto {
    id?: number;
    nome: string;
    categoria: string;
    descricao: string;
    preco: number;
    quantidadeEstoque: number;
    codigoBarras: string;
    ativo: boolean;
  }