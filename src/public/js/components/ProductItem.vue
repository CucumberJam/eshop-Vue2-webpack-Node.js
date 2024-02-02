<script>
  export default {
    props: {
      product: {
        type: Object,
        required: true,
      },
      img: {
        type: String,
        required: true,
        default: 'https://placehold.it/200x150',
      }
    }
  }
</script>

<template>
  <div class="product-item">
    <img v-bind:src="img" alt="Some img">
    <div class="desc">
      <h3>{{ product.product_name }}</h3>
      <p>{{ product.price }} ₽</p>
      <button class="buy-btn"
              :data-id="product.id_product"
              :data-name="product.product_name"
              :data-price="product.price" @click="$root.$refs.cart.addToCart(product)">
        Купить
      </button>
    </div>
  </div>
</template>

<style>
p {
  margin: 0 0 5px 0;
}
.product-item{
  display: flex;
  flex-direction: column;
  width: 200px;
  border-radius: 5px;
  overflow: hidden;
  margin: 20px 0;
}
img {
  max-width: 100%;
  height: auto
}
.desc {
  border: 1px solid #c0c0c040;
  padding: 15px
}
.buy-btn{
  margin-top: 5px;
  background-color: #2f2a2d;
  padding: 5px 15px;
  border: 1px solid transparent;
  color: #fafafa;
  border-radius: 5px;
  transition: all ease-in-out .4s;
  cursor: pointer;
}
.buy-btn:hover{
  background-color: #fafafa;
  color: #2f2a2d;
  border: 1px solid #2f2a2d;
}
button:focus{
  outline: none;
}
</style>
