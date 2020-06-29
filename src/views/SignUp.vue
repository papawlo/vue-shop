<template>
  <div>
    <header>
      <NavBar />
    </header>

    <main class="login">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-6">
            <img src="/img/svg/login-modal.svg" alt="login" class="w-100" />
          </div>
          <div class="col-md-6">
            <h3>Sign Up</h3>
            <form action="#" @submit.prevent="register">
              <div class="form-group">
                <label for="name">Your name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="name"
                  placeholder="Your nice name"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <small
                  id="emailHelp"
                  class="form-text text-muted"
                >We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  name="password"
                  v-model="password"
                  class="form-control"
                  id="password"
                />
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" @click="register" class="btn btn-primary">Submit</button>
            </form>
            <p>
              Do you have an account? So
              <router-link to="/login">login</router-link>
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
import firebase from "@/firebase";

export default {
  name: "signUp",
  data() {
    return { name: null, email: null, password: null };
  },
  methods: {
    register() {
      firebase
        .auth()

        .createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.name
            })
            .then(() => {});

          firebase
            .collection("profiles")
            .doc(data.user.uid)
            .set({
              name: this.name
            })
            .then(console.log("Document successfuly writen"))
            .catch(err => {
              console.error("ERROR ", err);
            });
          this.$router.replace("admin");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    }
  },
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
// header {
//   margin-top: 35px;
// }
</style>
