<template>
  <div class="products" id="products">
    <div class="container">
      <h1 class="text-center p-5">Our Products List</h1>
      <div class="row">
        <div class="col-md-4" v-for="(product,index) in products" :key="index">
          <div class="card product-item">
            <div v-if="product.images">
              <carousel :perPage="1">
                <slide v-for="(image, index) in product.images" :key="index">
                  <img :src="image" class="card-img-top" alt="..." />
                </slide>
              </carousel>
            </div>
            <div v-else>
              <img src="https://placehold.it/400x200" class="w-100" />
            </div>

            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">{{ product.name }}</h5>
                <h5 class="card-price">{{ product.price | currency}}</h5>
              </div>
              <add-to-cart
                :p-id="product.id"
                :price="product.price"
                :name="product.name"
                :image="getImage(product.images)"
              ></add-to-cart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productsCollection } from "@/firebase";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "ProductList",
  props: {
    msg: String
  },
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      products: []
    };
  },
  methods: {
    getImage(images) {
      if (images) {
        return images[0];
      }
      return;
    }
  },
  firestore() {
    return {
      products: productsCollection
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products {
  margin-top: 7rem;
  background: #f2f2f2;
  padding-bottom: 3rem;
}
.card {
  margin-top: 1em;
}
</style>