<script>
  export default {
    data(){
      return {
        searchLine: '',
      }
    }
  }
</script>

<template>
  <form action="#" class="search-form">
    <input type="text" class="search-field"
           v-model="searchLine"
           @input.prevent="$root.$refs.products.filter(searchLine)">
    <button class="btn-search" type="submit">
      <i class="fas fa-search"></i>
    </button>
  </form>
</template>

<style>
.btn-search {
  background-color: transparent;
  border: none;
  color: #fafafa;
  font-size: 1.2em;
  position: absolute;
  bottom: 5px;
  right: 0;
}
.search-form{
  position: relative;
  margin-right: 50px;
  display: inline-block;
}
.search-field:focus{
  outline: none;
}
.search-field {
  box-sizing: border-box;
  width: 200px;
  color: #fafafa;
  padding: 10px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #fafafa;
}
</style>
