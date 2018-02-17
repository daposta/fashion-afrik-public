import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ColorService } from '../../services/color.service';
import { FabricService } from '../../services/fabric.service';
import { SizeService } from '../../services/size.service';

import {FormBuilder,FormGroup, Validators} from '@angular/forms'

import {Router, ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Globals } from '../../shared/api';
// import 'assets/summernote';
import  'jquery-zoom';

declare var $: any;

// import  'slick-carousel';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [ ProductService, CartService, ColorService, FabricService, SizeService]
})
export class ProductDetailComponent implements OnInit {
 t = localStorage;
  product: Object= {};
  review: Object= {};
  host_address: string =  this.globals.HOST_URL;
  productItem: Object= {};
  cartForm:FormGroup;
  reviewForm:FormGroup;
  customizeProductForm:FormGroup;
  private reviewSubmitAttempt: boolean;
  private customSubmitAttempt: boolean;
  reps: any[];
  title:any;
  description:any;
  img_url:any;
  url: any;
   error: any;
  cart: any[];
  colors: any[];
  fabrics: any[];
  sizes: any[];

  private formSubmitAttempt: boolean;

  constructor(private productSrv :ProductService, private route: ActivatedRoute, private globals: Globals,
    private cartSrv: CartService, private colorSrv: ColorService, private sizeSrv: SizeService,
      private fabricSrv: FabricService, fb: FormBuilder) {
      this.cartForm = fb.group({
        'qty':['', Validators.required],
        //'measurementType':['', Validators.required],
        'size':['', Validators.required],
        'color':['', Validators.required],
      });

       this.reviewForm = fb.group({
           'name':['', Validators.required],
          'email':['', Validators.required],
          'comment':['', Validators.required],
      });

        this.customizeProductForm = fb.group({
           'fabric':['', Validators.required],
          'color':['', Validators.required],
          'collar':['', Validators.required],
           'waist':['', Validators.required],
            'chest':['', Validators.required],
            'insideLegs':['', Validators.required],
             'upperBodyLength':['', Validators.required],
      });




      $(function(){
    $('.responsive').slick({
       dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 5
        });

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        centerMode: true,
        asNavFor: '.slider-nav'
      });
      $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        // centerMode: true,
        arrows: true,
        focusOnSelect: true
      });

      // product slider zoom
      $('.slider-nav .slider-item').zoom({url:  '/assets/img/denim1.jpg'});
  });

  $('.filter').click(function(e){
    $(this).addClass('is-loading');
  });

  }






  ngOnInit() {

    this.colorSrv.fetchColors().subscribe(
         data => {
               this.colors = data.results;

         }, error =>{
        
        let msg = JSON.parse(error._body)['message'];
        
        this.error = msg;
        
    });//.then(response => this.colors = response.results);
    this.fabricSrv.fetchFabrics().subscribe(
         data => {
               this.fabrics = data.results;

         }, error =>{
        
        let msg = JSON.parse(error._body)['message'];
        
        this.error = msg;
        
    });//.then(response => this.fabrics = response.results);
    this.sizeSrv.fetchSizes().then(response => this.sizes = response.results);



      this.route.params.switchMap((params: Params) =>
         this.productSrv.findProductByUUID(params['id']))
       .subscribe(
         data => {
               this.product = data;
               let product_imgs = [];
               product_imgs.push(this.product['feature_image']);

               for(let i =0; i < this.product['other_product_images'].length; i++){
                      product_imgs.push(this.product['other_product_images'][i].doc);
                }
              this.reps = product_imgs;
              this.title = this.product['name'];
              this.description = this.product['description'];
              this.img_url = this.product['feature_image'];
              this.url = document.location.href;

         });

        //  $('.summernote').summernote();
  }

 numbersOnly(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  addToCart(){
      this.formSubmitAttempt = true;
     if(this.cartForm.valid  && this.product){
        let data = {'product':this.product, 'qty':this.productItem['qty'] }

        this.cartSrv.addToCart(data);
        this.getCart();
        $("html, body").animate({ scrollTop: 0 }, "slow");
     }

  };

  getCart(){

    this.cart = this.cartSrv.loadCart()//.then(response => this.cart = response)


  }

  saveReview(){
    this.reviewSubmitAttempt = true;
    if (this.reviewForm.valid){
        this.review['product'] = this.product['id'];
        this.productSrv.saveNewReview(this.review, this.product);
       }
  };

  saveCustomRequest(data){
    this.customSubmitAttempt =true;
    console.log('clicked...');
    if(this.customizeProductForm.valid){
      console.log(data);
    }
  }


 goToAddReview(){
    $('html, body').animate({
        scrollTop: $("#product-description").offset().top
    }, 2000);
 }



 checkItemInCart(){

 }


 checkItemInWishList(){

 }





}
