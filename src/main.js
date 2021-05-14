import Vue from 'vue'
import App from './App.vue'
import store from './store'
import showgrapg from './showgrapg';
import vuetify from './plugins/vuetify';
import router from './router'

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  showgrapg,
  render: h => h(App)
}).$mount('#app')
