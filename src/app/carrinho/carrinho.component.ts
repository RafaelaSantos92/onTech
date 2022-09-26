import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos';
import { ProdutosRoutingModule } from '../produtos/produtos-routing.module';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

    itensCarrinho: IProdutoCarrinho[] = [];
    total = 0; 
  router: any;

  constructor(
        public carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obterCarrinho();
    this.calcularTotal();
  }

  calcularTotal(){
      this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.preco * curr.quantidade), 0);
  }

  removerProdutoCarirnho(produtoId: number){
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
    this.carrinhoService.removerProdutoCarrinho(produtoId);
    this.calcularTotal();

  }

  comprar(){
    alert("Parabéns! Você finalizou a sua compra");
    this.carrinhoService.limparCarrinho();
    this.router.navigate(['produtos']);
  }

}
