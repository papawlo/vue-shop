/* eslint-disable vue/require-v-for-key */
<template>
  <div class="c-login">
    <div
      id="m-login"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loginTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <!-- <div class="modal-header">
            
          </div>-->
          <div class="modal-body">
            <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-login"
                  role="tab"
                  aria-controls="pills-login"
                  aria-selected="true"
                >Login</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-register-tab"
                  data-toggle="pill"
                  href="#pills-register"
                  role="tab"
                  aria-controls="pills-register"
                  aria-selected="false"
                >Signup</a>
              </li>
            </ul>
            <hr class="my-2" />

            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-login"
                role="tabpanel"
                aria-labelledby="pills-login-tab"
              >
                <h5 class="text-center">Login Please</h5>

                <form
                  action="#"
                  @submit.prevent="checkForm"
                  class="needs-validation"
                  :class="[ hasError ? 'was-validated': '' ]"
                  novalidate="true"
                >
                  <div class="invalid-feedback" v-if="hasError">{{logErrorMessage}}</div>
                  <div v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                      <li v-for="(error,i) in errors" :key="i" class="invalid-feedback">{{ error }}</li>
                    </ul>
                  </div>

                  <!-- <div class="invalid-feedback" v-for="(error,i) in errors" :key="i">{{ error }}</div> -->
                  <div class="form-group">
                    <label for="loginForm-email">Email address</label>
                    <input
                      type="email"
                      id="loginForm-email"
                      v-model.trim="loginForm.email"
                      class="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      required
                    />
                    <small
                      class="form-text text-muted"
                    >We'll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                    <label for="loginForm-password">Password</label>
                    <input
                      type="password"
                      id="loginForm-password"
                      v-model.trim="loginForm.password"
                      class="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <button class="btn btn-primary" @click="login">Login</button>
                  </div>
                </form>
              </div>

              <div
                class="tab-pane fade"
                id="pills-register"
                role="tabpanel"
                aria-labelledby="pills-register-tab"
              >
                <h5 class="text-center">Create New Account</h5>
                <form action="#" @submit.prevent="register">
                  <div class="form-group">
                    <label for="signupForm-name">Your name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="signupForm-name"
                      v-model="signupForm.name"
                      placeholder="Your nice name"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label for="signupForm-email">Email address</label>
                    <input
                      type="email"
                      v-model="signupForm.email"
                      id="signupForm-email"
                      class="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="signupForm-password">Password</label>
                    <input
                      v-model.trim="signupForm.password"
                      type="password"
                      class="form-control"
                      id="signupForm-password"
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <button class="btn btn-primary">Signup</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import jQuery from "jquery";

export default {
  name: "LoginModal",
  data() {
    return {
      loginForm: {
        email: null,
        password: null
      },
      signupForm: {
        name: null,
        email: null,
        password: null
      },
      hasError: false,
      logErrorMessage: false,
      errors: []
    };
  },
  methods: {
    checkForm: function(e) {
      if (this.loginForm.password && this.loginForm.email) {
        return true;
      }

      this.errors = [];

      if (!this.loginForm.email) {
        this.errors.push("Email required.");
      } else if (!this.validEmail(this.loginForm.email)) {
        this.errors.push("Valid email required.");
      }

      if (!this.loginForm.password) {
        this.errors.push("Password required.");
      }

      if (!this.errors.length) {
        this.hasError = true;
        return true;
      }

      e.preventDefault();
    },
    login() {
      if (this.logEmail && this.loginForm.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(
            this.loginForm.email,
            this.loginForm.password
          )
          .then(() => {
            jQuery("#m-login").modal("hide");
            this.$router.replace("admin");
          })
          .catch(error => {
            // this.error = err.message;
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/weak-password") {
              // alert("The password is too weak.");
              this.logErrorMessage = errorMessage;
            } else {
              // alert(errorMessage);
              this.logErrorMessage = errorMessage;
            }
            console.log(error);
            this.hasError = true;
          });
      } else {
        this.error = "Verifique suas credeniais";
      }
    },
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.signupForm.email,
          this.signupForm.password
        )
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.signupForm.name
            })
            .then(() => {});
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
    },

    // login() {
    //   this.$store.dispatch("login", {
    //     email: this.loginForm.email,
    //     password: this.loginForm.password
    //   });
    // },
    // signup() {
    //   this.$store.dispatch("signup", {
    //     email: this.signupForm.email,
    //     password: this.signupForm.password,
    //     name: this.signupForm.name,
    //     title: this.signupForm.title
    //   });
    // },
    validEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
</style>
