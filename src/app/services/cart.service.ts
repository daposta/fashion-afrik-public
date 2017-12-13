import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  //public cart =[];
  constructor() { }

  loadCart(){
    let items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    for(var i=0; i < cart.length ; i++){
      let t = JSON.parse(cart[i]);
      items.push({
        product: t.product, qty:t.qty, cost: t.cost, price: t.price
      });

    }
    console.log(items);
    return items;
  }


  addToCart(data:any){

    let productId = data['product'].id
  	if(localStorage.getItem('cart'))
    {
  		  let cart:any = JSON.parse(localStorage.getItem('cart'));
        let index:number = -1;
        for(var i= 0; i < cart.length; i++){
        
          let item = JSON.parse(cart[i]);
        
          if(item['product']['id'] == productId){
           
            index = i;
            break;
          }
      }
      if(index == -1){
        //  cart.push(JSON.stringify(data));
       
        let item = data;
        item.price = data['product']['regular_price'];
        item.qty += data['qty'];
        item.cost = item.qty * item.price;
        cart[index] = JSON.stringify(item);
          localStorage.setItem('cart', JSON.stringify(cart));
      }
      else{
    
        let item = JSON.parse(cart[index]);
        item.price = item['product']['regular_price'];
        item.qty += data['qty'];
        item.cost = item.qty * item.price;
        cart[index] = JSON.stringify(item);
        localStorage.setItem('cart', JSON.stringify(cart));
      }




  	}
  	else{
     // console
  		 let cart =[];
  		 cart.push(data);
  		 localStorage.setItem('cart', JSON.stringify(cart));
  	}
   
  };

  removeFromCart(productId:any){

      if(localStorage.getItem('cart')){
         let cart:any = JSON.parse(localStorage.getItem('cart'));
      }


  }


  clearCart(){

  }

}
