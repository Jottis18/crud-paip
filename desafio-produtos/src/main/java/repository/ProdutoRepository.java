package br.com.pauloguilherme.desafio_produtos.repository;

import br.com.pauloguilherme.desafio_produtos.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}