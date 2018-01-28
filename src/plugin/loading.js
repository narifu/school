import Vuex from "vuex";
import Vue from 'vue';
Vue.use(Vuex);
const store = new Vuex.Store({});
store.registerModule('loading', { 
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})
export default store;