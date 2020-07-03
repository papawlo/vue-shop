<template>
  <div class="nav-bar">
    <nav class="navbar custom-nav fixed-top navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">Vue Shop</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/products" class="nav-link" href="#">Products</router-link>
            </li>

            <li class="nav-item">
              <router-link to="/about" class="nav-link" href="#">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/checkout" class="nav-link">Checkout</router-link>
            </li>
            <!-- <li class="nav-item">
              <a @click="logout" class="nav-link">logout</a>
            </li>-->
          </ul>
          <!-- <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <a class="btn btn-outline-success my-2 my-sm-0">Search</a>
          </form>-->
          <a
            class="btn btn-outline-info border-0 mx-2 my-2 my-sm-0"
            data-toggle="modal"
            data-target="#miniCart"
          >
            <i class="fas fa-cart-plus"></i>
          </a>
          <ul class="navbar-nav ml-auto mr-3">
            <template v-if="user.loggedIn">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >{{userProfile.name}}</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a class="nav-link" @click.prevent="logout" href="#">Logout</a>
                </div>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link to="login" class="nav-link">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link to="sign-up" class="nav-link">Register</router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
// import Login from "@/components/Login.vue";

import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  components: {
    // Login
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
      userProfile: "userProfile"
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (min-width: 992px) {
  .navbar.custom-nav {
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: #fff !important;
  }
}
</style>