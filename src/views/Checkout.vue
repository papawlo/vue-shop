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
          </div>
          <div class="col-md-3">
            <p>content</p>
          </div>
        </div>
      </div>
    </main>
    <login></login>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import Login from "@/components/LoginModal.vue";
export default {
  name: "home",
  components: {
    NavBar,
    Login
  }
};
</script>

<style scoped>
</style>