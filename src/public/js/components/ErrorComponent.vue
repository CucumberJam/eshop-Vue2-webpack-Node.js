<script>
export default {
  props: {
    error: {
      type: Object,
      status: Boolean,
      message: String,
      default: null,
    }
  },
  computed:{
    getStatus(){
      if(this.error.status){
        setTimeout(function(){
          this.error.status = false;
        }.bind(this), 4000);
        return true;
      }
    }
  }
}

</script>

<template>
  <div class="error" v-if="getStatus">
    <p>{{ error.message }}</p><br/>
  </div>

</template>

<style>
.error{
  position: absolute;
  margin: 30px auto 0 auto;
  color: red;
  text-decoration: line-through;
}
</style>