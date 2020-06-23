import Vue from 'vue'
import App from './App.vue'
import router from './router'
import jQuery from 'jquery'
import firebase from 'firebase'
import VueFirestore from 'vue-firestore'
require('firebase/firestore')

Vue.use(VueFirestore)

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle, faTimes, faBars, faTachometerAlt, faShoppingCart, faGem, faChartLine, faGlobe, faBook, faCalendar, faFolder, faThumbtack, faPowerOff, faBarcode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTwitter, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

library.add(faTwitter, faInstagram, faFacebookF);
library.add(faCircle, faTimes, faBars, faTachometerAlt, faShoppingCart, faGem, faChartLine, faGlobe, faBook, faCalendar, faFolder, faThumbtack, faPowerOff, faBarcode)

Vue.component('font-awesome-icon', FontAwesomeIcon)

window.$ = window.jQuery = jQuery

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
