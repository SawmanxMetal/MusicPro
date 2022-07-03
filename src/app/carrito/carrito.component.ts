import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProducts } from "../carrito/products";
import { ProductosService } from './../service/productos.service';
import { ProductcarService } from './productcar.service';
//import { IProducts } from './../products';
import  axios  from 'axios';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productos: any;
  mindicador: any;
  cartProducts: IProducts[] = [];
  totalQuantity!: number;
  price!: number;
  totalPrice!: number;
  cantidad: number = 1;
  hola :any
  
  constructor(
    private router:Router,
    private producCarService: ProductcarService
    ) { }

  ngOnInit(): void {
   
    this.producCarService.event.subscribe(product => {
      //salert("cart-list-ngOnInit");
     
      let index = -1;
      index = this.cartProducts.findIndex(
        p => p.sku === product.sku
        
      );

      if (index != -1) {
      this.hola=  this.cartProducts[index].cantidad += 1;
     

        console.log(this.hola);
      } else if (index === -1) {
       
   
        this.cartProducts.push(product);
        localStorage.setItem('producto', JSON.stringify ( this.cartProducts));
      }

      this.sum();
    });

    this.clpToUsd();

  }

  deleteProduct(sku:any) {
    let index = this.cartProducts.findIndex(item => item.sku === sku);
    this.cartProducts.splice(index, 1);
    localStorage.setItem('producto', JSON.stringify(this.cartProducts))
    this.sum();
  }

  sum(): void {

    
    this.totalQuantity = 0;
    this.price = 0;
    this.totalPrice = 0;
    if (this.cartProducts) {
      this.cartProducts.map(product => {
        this.totalQuantity += product.cantidad;
        this.price += product.precio;

        this.totalPrice += product.precio * product.cantidad;
      });
      // for (let i = 0; i < this.cartProducts.length; i++) {
      //   this.totalQuantity += this.cartProducts[i].product_quanity;
      //   this.price += this.cartProducts[i].product_price;
      //   this.totalPrice +=
      //     this.cartProducts[i].product_price * this.cartProducts[i].product_quanity;
      // }
    }
  }


  clpToUsd() {
    axios.get('https://mindicador.cl/api')
    .then((response:any) => {
      this.mindicador =  response.data.dolar.valor
      console.log(this.mindicador);
    })
    .catch((e:any) => {
        // Capturamos los errores
        console.log('error: ', e);
    })
}

  checkout() {
    this.router.navigate(["/checkout"]);
  }

  
}
