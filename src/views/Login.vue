<template>
  <div>
    <header>
      <NavBar />
    </header>

    <main class="login">
      <div class="container">
        <div class="row p-5 justify-content-center align-items-center">
          <div class="col-md-6">
            <img src="/img/svg/login-modal.svg" alt="login" width="400" />
          </div>
          <div class="col-md-6">
            <h3>Login</h3>
            <form action="#" @submit.prevent="submit">
              <div class="form-group">
                <label for="email">Email address</label>
                <input
                  type="email"
                  name="email"
                  v-model="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  required
                  autofocus
                />
                <small
                  id="emailHelp"
                  class="form-text text-muted"
                >We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  name="password"
                  v-model="password"
                  class="form-control"
                  id="password"
                  required
                />
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="checkme" />
                <label class="form-check-label" for="checkme">Check me out</label>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <p>
              You don't have an account? You can
              <router-link to="/sign-up">create one</router-link>
            </p>
          </div>
        </div>
      </div>
      <!-- <mini-cart></mini-cart> -->
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return { email: null, password: null };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace({ name: "admin" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  },
  components: {
    NavBar
  }
};
</script>

<style>
</style>
