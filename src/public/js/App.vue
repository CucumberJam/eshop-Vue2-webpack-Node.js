<script>
  import CartComponent from "./components/CartComponent.vue";
  import ProductsComponent from "./components/ProductsComponent.vue";
  import SearchComponent from "./components/SearchComponent.vue";
  export default {
    components: {
      ProductsComponent,
      SearchComponent,
      CartComponent
    },
    data(){
      return {
        userSearch: '', // :user-search="userSearch"
      }
    },
    methods: {
      getJson: function (url){
        return fetch(url)
            .then(result => result.json())
            .catch(error => {
              console.log(error);
            });
      },
      postJson(url, data) {
        return fetch(url, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(result => result.json())
            .catch(error => {
              console.log(error);   //this.$refs.error.setError(error);
            });
      },
      putJson(url, data) {
        return fetch(url, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(result => result.json())
            .catch(error => {
              console.log(error);   //this.$refs.error.setError(error);
            });
      },
      deleteJson(url, data) {
        return fetch(url, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(result => result.json())
            .catch(error => {
              console.log(error);   //this.$refs.error.setError(error);
            });
      },
    },
    mounted(){
      console.log(this);
    },
/*    computed: {
      addToCart: function(product){
        this.productAdded = product;
      }
    }*/
  }
</script>
<template ref="parent">
  <header>
    <div class="logo">Интернет-магазин</div>
    <div class="cart">
      <SearchComponent></SearchComponent>
      <CartComponent ref="cart"></CartComponent>
    </div>

  </header>

  <main>
  <ProductsComponent ref="products"></ProductsComponent>
  </main>
</template>
<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    font-family: 'SF Pro Display', sans-serif;
  }
  header{
    display: flex;
    background-color: #2f2a2d;
    justify-content: space-between;
    color: #fafafa;
    padding: 30px 80px;
  }
  .cart{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo{

    text-transform: uppercase;
    font-weight: bold;
  }
</style>