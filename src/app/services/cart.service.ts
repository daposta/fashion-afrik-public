import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  //public cart =[];
  constructor() { }

  loadCart(){
    let items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart){
         for(var i=0; i < cart.length ; i++){
              let t = cart[i]; //JSON.parse(cart[i]);
              items.push({
                product: t.product, qty:t.qty, cost: t.cost, price: t.price
              });

            }
          
            return items;
         }
   
  }


  addToCart(data:any){

    let productId = data['product'].id
  	if(localStorage.getItem('cart'))
    {
  		  let cart:any = JSON.parse(localStorage.getItem('cart'));
        let index:number = -1;
        for(var i= 0; i < cart.length; i++){
        
          let item = cart[i];//JSON.parse(cart[i]);
        
          if(item['product']['id'] == productId){
           
            index = i;
            break;
          }
      }
      if(index == -1){
        let item = data;
        item.price = data['product']['regular_price'];
        item.qty  = data['qty'];
        item.cost = item.qty * item.price;
       // cart[index] = item;//JSON.stringify(item);
       cart.push(item);
          localStorage.setItem('cart', JSON.stringify(cart));
         
      }
      else{
         
        let item =  cart[index] //JSON.parse(cart[index]);
        item.price = item['product']['regular_price'];
        item.qty += data['qty'];
        item.cost = item.qty * item.price;
        cart[index] = item; //JSON.stringify(item);
        
        localStorage.setItem('cart', JSON.stringify(cart));
      }




  	}
  	else{
     
       let item = data;
        item.price = data['product']['regular_price'];
        item.qty  = data['qty'];
        item.cost = item.qty * item.price;

  		 let cart =[];
  		 cart.push(item);
  		 localStorage.setItem('cart', JSON.stringify(cart));
  	}
   
  };

  removeFromCart(data:any){

     let productId = data['product'].id;
      if(localStorage.getItem('cart')){
         let cart:any = JSON.parse(localStorage.getItem('cart'));
         let index:number = -1;
         for(var i= 0; i < cart.length; i++){
        
          let item = cart[i];//JSON.parse(cart[i]);
        
            if(item['product']['id'] == productId){
             
              index = i;
              break;
            }
        }
        if(index != -1){
         
           let item =  cart[index]
           cart.pop(item);
         
           localStorage.setItem('cart', JSON.stringify(cart));
        }
       
      }


  }


  clearCart(){
    localStorage.removeItem('cart');
  }

}
