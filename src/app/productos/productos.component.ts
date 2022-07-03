import { ProductosService } from './../service/productos.service';

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {IProducts} from '../products';
import { ProductcarService } from './../carrito/productcar.service';
import  axios  from 'axios';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  

  constructor( private productService: ProductosService, private router: Router, private productCarService:ProductcarService) { }
  
  mindicador! : any;
  products!:IProducts[];
  productos: any;
  
  ngOnInit(): void {
    this.productService.getEntrega().subscribe((productos: any) => {
      this.productos = productos;
      //sconsole.log(this.productos);

     });;

    //  this.productos = this.productCarService.getProd()
    //   console.log(this.productos );
    this.clpToUsd()
    
  }


  carrito() {
    this.router.navigate(["/carrito"]);
  }

  checkout() {
    this.router.navigate(["/checkout"]);
  }
  
  addToCart(product:any): void {
    this.productCarService.event.emit(product);   

  }

  view(product:IProducts){
    alert(product.descripcion)
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

  

}
