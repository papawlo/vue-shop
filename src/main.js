import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'

import jQuery from 'jquery';
import VueFirestore from 'vue-firestore'
require('firebase/firestore')

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})


import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)


import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

window.$ = window.jQuery = jQuery;

import 'popper.js'
import 'bootstrap'
import './assets/app.scss'

// Vue.component('NavBar', require('./components/NavBar.vue').default)

import AddToCart from './components/AddToCart'
Vue.component('AddToCart', AddToCart);
import MiniCart from './components/MiniCart'
Vue.component('MiniCart', MiniCart);

Vue.config.productionTip = false
Vue.config.devtools = true

let app = null;
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
})