<script>
  import ProductItem from "./ProductItem.vue";
  import ErrorComponent from "./ErrorComponent.vue";

  export default {
    components: {
      ErrorComponent,
      ProductItem,
    },
    props: {
      userSearch: {
        type: String,
      }
    },
    data(){
      return {
        catalogURL: '/api/products', //'/catalogData.json',(через API)
        products: [],
        filtered: [],
        imgCatalog: 'https://placehold.it/200x150',
        error: {
          status: false,
          message: 'Error with server response for downloading products in catalog',
        }
      }
    },
    mounted(){
      this.$parent.getJson(this.catalogURL)
          .then(data => {
            this.products = [...data];
            this.filtered = [...data];
          })
          .catch(error => {
            this.error.status = true;
            console.log(error.message + ' ' + this.error.message);
          });
    },
    methods: {
      filter: function(searchLine){
        const regExpr = new RegExp(searchLine, 'i');
        this.filtered = this.products.filter(prod => regExpr.test(prod.product_name));
      },
    },
  }
</script>

<template>
  <div class="products">
    <ErrorComponent :error="error"></ErrorComponent>
    <ProductItem v-for="item in filtered"
                 :key="item.id_product"
                 :img="imgCatalog"
                 :product="item"
                 :data-id="item.id_product"
      ></ProductItem>
  </div>
</template>
<style>
.products {
  column-gap: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-template-rows: 1fr;
  padding: 40px 80px;
  justify-content: space-between;
}

</style>