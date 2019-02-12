// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import Vuex
import Vuex from 'vuex'

// import bootstrap JS
import BootstrapVue from 'bootstrap-vue'
// use Database with firebase
import firebase from 'firebase'

// import bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// use template with bootstrap
Vue.use(BootstrapVue)

// use vuex
Vue.use(Vuex)
Vue.config.productionTip = false

// Add firebase to WebApp
var config = {
  apiKey: 'AIzaSyCsF_iO92BKEmzOo4dqQPK10FT4fg0UfFE',
  authDomain: 'projectcpe-2775c.firebaseapp.com',
  databaseURL: 'https://projectcpe-2775c.firebaseio.com',
  projectId: 'projectcpe-2775c',
  storageBucket: 'projectcpe-2775c.appspot.com',
  messagingSenderId: '319109819604'
}
firebase.initializeApp(config)

/* eslint-disable no-new */
/* let app = ''
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
}) */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
