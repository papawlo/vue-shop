import './jquery'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import jQuery from 'jquery'
import firebase from 'firebase'
import VueFirestore from 'vue-firestore'
require('firebase/firestore')


Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle, faTimes, faBars, faTachometerAlt, faShoppingCart, faGem, faChartLine, faGlobe, faBook, faCalendar, faFolder, faThumbtack, faPowerOff, faBarcode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTwitter, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

library.add(faTwitter, faInstagram, faFacebookF);
library.add(faCircle, faTimes, faBars, faTachometerAlt, faShoppingCart, faGem, faChartLine, faGlobe, faBook, faCalendar, faFolder, faThumbtack, faPowerOff, faBarcode)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// window.$ = window.jQuery = jQuery
// window.Swal = Swal;

// const Toast = Swal.mixin({
//   toast: true,
//   position: 'top-end',
//   showConfirmButton: false,
//   timer: 3000
// });

// window.Toast = Toast;

import 'popper.js'
import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/app.scss'

// Vue.component('NavBar', require('./components/NavBar.vue').default)
Vue.config.productionTip = false

let app = '';

firebase.auth().onAuthStateChanged(function (user) {
  console.log(user);
  if (!app) {
    app = new Vue({
      router,
      // store,
      render: h => h(App)
    }).$mount("#app");

  }

});
