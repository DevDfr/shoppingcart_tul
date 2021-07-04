import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from 'src/app/models/product';
import { Cart } from '../models/cart';
import { ProductCart } from '../models/product_cart';

@Injectable()
export class DataService {

  private cartCollection: AngularFirestoreCollection<Cart>
  private productCollection: AngularFirestoreCollection<Product>
  private productCartCollection: AngularFirestoreCollection<ProductCart>

  products: Product[] = []
  carts: Cart[] = []
  productsCarts: ProductCart[] = []
  ordenes: any[] = []

  constructor(private readonly afData: AngularFirestore) {
    this.cartCollection = afData.collection<Cart>('carts')
    this.productCollection = afData.collection<Product>('products')
    this.productCartCollection = afData.collection<ProductCart>('product_cart')
  }

  orderSave(order: Product[]){

    return new Promise((resolve, reject) => {

      const id_cart = this.afData.createId()
      const data = { id: id_cart, status: 'pending' }
      const result = this.cartCollection.doc(id_cart).set(data)

      order.map(p => {

        const id_p_cart = this.afData.createId()
        const datapc = { id: id_p_cart, product_id: p.id, cart_id: id_cart, quantity: p.quantity }
        const resultpc = this.productCartCollection.doc(id_p_cart).set(datapc)

      })

      resolve(result)

    })

  }

  getProducts(){

    return new Promise<Product[]>((resolve, reject) => {

      this.productCollection.valueChanges().subscribe(item => {

        var arr = []

        for(var i = 0 ; i < item.length; i++){
          arr.push(item[i])
        }

        resolve(arr)

      })

    })

  }

  getCarts(){

    return new Promise<Cart[]>((resolve, reject) => {

      this.cartCollection.valueChanges().subscribe(item => {

        var arr = []

        for(var i = 0 ; i < item.length; i++){
          arr.push(item[i])
        }

        resolve(arr)

      })

    })

  }

  getProductCarts(){

    return new Promise<ProductCart[]>((resolve, reject) => {

      this.productCartCollection.valueChanges().subscribe(item => {

        var arr = []

        for(var i = 0 ; i < item.length; i++){
          arr.push(item[i])
        }

        resolve(arr)

      })

    })

  }


  async getOrders(){

    this.products = await this.getProducts()
    this.carts = await this.getCarts()
    this.productsCarts = await this.getProductCarts()

    for(var i = 0; i < this.carts.length; i++){

      const pcArr = this.productsCarts.filter(x => x.cart_id == this.carts[i].id)

      var arrP = []
      var total = 0

      for(var j = 0; j < pcArr.length; j++){

        arrP.push( this.products.find(x => x.id == pcArr[j].product_id) )
        total = total + pcArr[j].quantity

      }

      this.ordenes.push({
        id: this.carts[i].id,
        status: this.carts[i].status,
        total,
        products: arrP
      })

    }

    return this.ordenes

  }


  completeOrder(idCart: string){

    this.cartCollection.doc(idCart).update({
      id: idCart,
      status: 'completed'
    })

  }


}
