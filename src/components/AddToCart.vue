<template>
  <div class="btn-add-to-cart">
    <button href="#" class="btn btn-primary" @click="addToCart">Add to Cart</button>
  </div>
</template>

<script>
export default {
  name: "AddToCart",
  props: {
    pId: String,
    name: String,
    price: String,
    image: String,
    quantity: String
  },
  data() {
    return {
      item: {
        product_id: this.pId,
        productName: this.name,
        productPrice: this.price,
        productImage: this.image,
        productQuantity: 1
      }
    };
  },
  methods: {
    addToCart() {
      console.log("addd");
      // if (this.$store).state.cart {

      // } else {

      // }
      this.$store.commit("addToCart", this.item);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
</style>
