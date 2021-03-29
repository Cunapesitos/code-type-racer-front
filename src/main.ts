import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';
import VueClipboard from 'vue-clipboard2';

Vue.use(VueRouter);
Vue.use(VueClipboard);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
