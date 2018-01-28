import Vue from 'vue';
import App from './App';
import store from "./plugin/loading";
import router from './router/index';
import i18n from './i18n/index';
import "./plugin/fastClick";

Vue.config.productionTip = false;

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

new Vue({
  i18n,
  store,
  router,
  render: h => h(App),
}).$mount('#app-box');
