import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
   providers: [  CartService]
})
export class ShoppingCartComponent implements OnInit {
 
  cart: any[];
  constructor(private cartSrv: CartService) { }

  ngOnInit() {
  		this.getCart();
  }


  removeFromCart(){
  	
  }

  getCart(){
    this.cart = this.cartSrv.loadCart()//.then(response => this.cart = response)
    
  }



}
