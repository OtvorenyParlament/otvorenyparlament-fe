import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPeriodNum: process.env.VUE_APP_DEFAULT_PERIOD,
  },
  mutations: {
    newPeriod(state, newPeriodNum) {
      state.currentPeriodNum = newPeriodNum;
    },
  },
  actions: {

  },
});
