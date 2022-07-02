import { ProductosService } from './../service/productos.service';

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {IProducts} from '../products';
import { ProductcarService } from './../carrito/productcar.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  

  constructor( private productService: ProductosService, private router: Router, private productCarService:ProductcarService) { }
  products!:IProducts[];
  productos: any;
  ngOnInit(): void {
    this.productService.getEntrega().subscribe((productos: any) => {
      this.productos = productos;
      //sconsole.log(this.productos);

     });;

    //  this.productos = this.productCarService.getProd()
    //   console.log(this.productos );

    
  }


  carrito() {
    this.router.navigate(["/carrito"]);
  }

  checkout() {
    this.router.navigate(["/checkout"]);
  }
  
  addToCart(product:any): void {
    this.productCarService.event.emit(product);   
console.log('este es');
console.log(this.productos);
    console.log( this.productCarService.event.emit());
  }

  view(product:IProducts){
    alert(product.descripcion)
  }


}
