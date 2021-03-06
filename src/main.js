import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import instance from "./api/http";
import './utils/ele_ui';


Vue.config.productionTip = false
Vue.prototype.$axios = instance;
// Vue.forceUpdate();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
