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
                    <label for="logEmail">Email address</label>
                    <input
                      type="email"
                      id="logEmail"
                      v-model="logEmail"
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
                    <label for="logPassword">Password</label>
                    <input
                      type="password"
                      id="logPassword"
                      v-model="logPassword"
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
                    <label for="name">Your name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="regName"
                      v-model="regName"
                      placeholder="Your nice name"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label for="regEmail">Email address</label>
                    <input
                      type="email"
                      v-model="regEmail"
                      id="regEmail"
                      class="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="regPassword">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="regPassword"
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
      regName: null,
      regEmail: null,
      regPassword: null,
      logEmail: null,
      logPassword: null,
      hasError: false,
      logErrorMessage: false,
      errors: []
    };
  },
  methods: {
    checkForm: function(e) {
      if (this.logPassword && this.logEmail) {
        return true;
      }

      this.errors = [];

      if (!this.logEmail) {
        this.errors.push("Email required.");
      } else if (!this.validEmail(this.logEmail)) {
        this.errors.push("Valid email required.");
      }

      if (!this.logPassword) {
        this.errors.push("Password required.");
      }

      if (!this.errors.length) {
        this.hasError = true;
        return true;
      }

      e.preventDefault();
    },
    login() {
      if (this.logEmail && this.logPassword) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.logEmail, this.logPassword)
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
        .createUserWithEmailAndPassword(this.regEmail, this.regPassword)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.regName
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
