<template>
  <div>
    <header>
      <NavBar />
    </header>

    <main class="checkout">
      <div class="container">
        <div class="row">
          <div class="col-md-9">
            <h1 class="py-3">Checkout Page</h1>
            <ul>
              <li v-for="(item,i) in this.$store.state.cart" :key="i" class="media">
                <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt />
                <div class="media-body">
                  <h5 class="mt-0">
                    {{item.productName}}
                    <span
                      class="float-right"
                      @click="$store.commit('removeFromCart',item)"
                    >X</span>
                  </h5>
                  <p class="mt-0">{{(item.productQuantity *item.productPrice) | currency}}</p>
                  <p class="mt-0">Quantity : {{item.productQuantity }}</p>
                </div>
              </li>
            </ul>
            <button class="pay-with-stripe btn btn-primary mt-4" @click="pay">Pay with credit card</button>
          </div>
          <div class="col-md-3">
            <p>content</p>
          </div>
        </div>
      </div>
    </main>
    <login></login>
    <mini-cart></mini-cart>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import Login from "@/components/LoginModal.vue";
import axios from "axios";
import Stripe from "stripe";
const stripe = Stripe("pk_test_3yyWicMGKdLdRD28kHM3ANkX00vOa4k2B3");
export default {
  name: "home",
  components: {
    NavBar,
    Login
  },
  data() {
    return {
      sessionId: ""
    };
  },
  methods: {
    pay() {
      // data = {id:10,id:10}
      let data = this.$store.state.cart.map(item => ({
        [item.productId]: item.productQuantity
      }));
      data = Object.assign({}, ...data);
      axios
        .get(
          "https://us-central1-vue-shop-5a95e.cloudfunctions.net/CheckoutSession",
          {
            params: {
              products: data
            }
          }
        )
        .then(response => {
          this.sessionId = response.data;
          console.log(response.data);
          stripe
            .redirectToCheckout({
              sessionId: this.sessionId.id
            })
            .then(function(result) {
              console.log(result);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>


<style scoped>
</style>