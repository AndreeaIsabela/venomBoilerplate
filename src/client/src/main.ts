import Vue from 'vue';
import Router from 'vue-router';

import App from './App.vue';
import store from './store';
import { routerFactory } from './routes/index';
import { addAuthorizationHeader } from './interceptors/addAuthorizationHeader';
import { unauthorizedRequest } from './interceptors/unauthorized';

Vue.config.productionTip = false;
Vue.use(Router);

new Vue({
  router: routerFactory(Router),
  store,
  render: (h) => h(App),
  created() {
    unauthorizedRequest(this.$router);
    addAuthorizationHeader();
  },
}).$mount('#app');
