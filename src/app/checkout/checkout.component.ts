import { ASTWithSource } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  productos:any
  productosJSON:any
  total:any
  totalQuantity!: number;
  precioTotal:any
  constructor( private router: Router) { }

  ngOnInit(): void {
    this.getData()
  }
getData(){
  this.productos = localStorage.getItem('producto')
  this.productosJSON = JSON.parse(this.productos)
  this.totalQuantity = 0
  this.total = 0
  this.productosJSON.map((item:any) => {
   this.totalQuantity += item.cantidad 
   this.total += item.precio * item.cantidad
 
  })

}

volver() {
  this.router.navigate([""]);
}
 

}
