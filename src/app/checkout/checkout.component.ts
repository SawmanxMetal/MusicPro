import { ASTWithSource } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  mindicador:any;
  productos:any
  productosJSON:any
  productosArray = []
  total:any
  totalQuantity!: number;
  precioTotal:any
  constructor( private router: Router) { }

  ngOnInit(): void {
    this.getData()
    this.clpToUsd(); 
   
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


updateProduct(){
 
     for (let j = 0; j < this.productosJSON.length; j++) {
       const element = this.productosJSON[j];
       this.callUpdateProduct(element.sku,element.stock -  this.productosJSON[j].cantidad )
     }
     localStorage.removeItem('producto')
     this.confirmBox()

    }

    confirmBox(){
      Swal.fire({
        title: 'Felicidades!!!',
        text: 'Compra realizada con exito',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK!',
    
      }).then((result) => {
        if(result)  this.router.navigate([""]);
      
      })
    }

async callUpdateProduct(sku:string, stock:number) {
  await axios.put('http://localhost:3000/updateproductsCompra', {
    sku: sku,
    stock: stock
  })
 
}
  
}







