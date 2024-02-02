<script>
  import CartItem from "./CartItem.vue";
  import ErrorComponent from './ErrorComponent.vue'
  export default {
    components: {
      CartItem, ErrorComponent,
    },
    data(){
      return {
        imgCart: 'https://via.placeholder.com/50x100',
        cartUrl: '/api/cart/',
        cartItems: [],
        isVisible: false,
        error: {
          status: false,
          message: 'Error with server response for downloading items in cart',
        }
      }
    },
    mounted(){
      this.$parent.getJson(this.cartUrl)
          .then(data => {
            this.cartItems = [...data.contents];
          })
          .catch(error => {
            this.error.status = true;
            console.log(error.message + ' ' + this.error.message);
          });
    },
    methods: {
      remove: function(product){
        let found = this.cartItems.find(el => el.id_product === product.id_product);
        if(found){
          // если количество больше одного, то внести изменение put
          if(found.quantity > 1){
            this.$parent.putJson(this.cartUrl + found.id_product, {quantity: -1})
                .then(data => {
                  if(data.result === 1){
                    found.quantity--;
                  }else{
                    this.error.status = true;
                    this.error.message = "Error with reducing product's quantity while adding to Cart. "
                    return new Error(this.error.message + data.text);
                  }
                })
                .catch(error => console.log(error));
          }else{  // если количество равно одному, то удалить весь товар
            this.$parent.deleteJson(this.cartUrl + found.id_product, product)
                .then(data => {
                  if(data.result === 1){
                    this.cartItems.splice(this.cartItems.indexOf(found), 1);
                  }else{
                    this.error.status = true;
                    this.error.message = "Error with removing product from Cart. "
                    return new Error(this.error.message + data.text);
                  }
                })
                .catch(error => console.log(error));
          }
        }
      },
      addToCart(product){
        let found = this.cartItems.find(el => el.id_product === product.id_product);
        if(found){ // если товар найден, то нужно изменить его количество в корзине:
          this.$parent.putJson(this.cartUrl + found.id_product, {quantity: 1})
              .then(data => {
                if(data.result === 1){
                  found.quantity++;
                }else{
                  this.error.status = true;
                  this.error.message = "Error with increasing product's quantity while adding to Cart. "
                  return new Error(this.error.message + data.text);
                }
              })
              .catch(error => console.log(error));
        }else{ // если товар не найден, то нужно положить в корзину новый товар:
          let prodObj = Object.assign({quantity: 1}, product);
          this.$parent.postJson(this.cartUrl, prodObj)
          .then(data => {
            if (data.result === 1){
              this.cartItems.push(prodObj);
            }else{
              this.error.status = true;
              this.error.message = "Error with adding new product to Cart. "
              return new Error( this.error.message + data.text);
            }
          }).catch(error => console.log(error));
        }
      },
      showCart: function(){
        this.isVisible = !this.isVisible;
      }
    },
  }
</script>

<template>
  <div>
    <button class="btn-cart" type="button" @click="showCart">Корзина</button>
    <div v-show="isVisible" class="cart-block">
      <p v-if="!cartItems.length">Корзина пуста</p>
      <ErrorComponent :error="error"></ErrorComponent>
      <CartItem  v-for="item in cartItems"
                 :key="item.id_product"
                 :data-id="item.id_product"
                 :img="imgCart" :cart-item="item"
                  @remove="remove">
      </CartItem>
    </div>
  </div>
</template>

<style>
  .cart-block{
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.62);
    border-radius: 5px;
    box-sizing: border-box;
    right: 0;
    top: 130%;
    position: absolute;
    background-color: white;
    padding: 20px;
    color: black;
    width: 300px;
  }
  .cart-block:before{
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: -10px;
    right: 35px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }
  button:focus{
    outline: none;
  }
  .btn-cart{
    background-color: #fafafa;
    padding: 10px 20px;
    border: 1px solid transparent;
    color: #2f2a2d;
    border-radius: 5px;
    transition: all ease-in-out .4s;
    cursor: pointer;
  }
  .btn-cart:hover{
    background-color: transparent;
    border-color: #fafafa;
    color: #fafafa;
  }
  .btn-cart{
    align-self: center;
  }

</style>