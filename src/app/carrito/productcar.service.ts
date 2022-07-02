import { Injectable, Output, EventEmitter} from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class ProductcarService {

  productos!: any;

  constructor() { }
  @Output() event = new EventEmitter();
  
  method = 'get' // ex. get | post | put | delete , etc
 
   getProd() {
    
    
    // return axios['get']('http://localhost:3000/products')
    // .then((response:any) => {
    //     // success
    //     //-> save response to state, notification
    //     this.productos =  response.data
    //     console.log('lepego');
    //     return this.productos // pass to finish
    // })
    // .catch((error:any) => {
    //     // failed
    //     //-> prepare, notify, handle error

    //     return false // pass to finish
    // })
    
    
    
    
    
      axios.get('http://localhost:3000/products')
     .then(response => {
       this.productos =  response.data
     
     })
     .catch(e => {
         // Capturamos los errores
         console.log('error: ', e);
     })
}
 

}
