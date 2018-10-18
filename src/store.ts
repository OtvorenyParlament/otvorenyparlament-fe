import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPeriodNum: process.env.VUE_APP_DEFAULT_PERIOD,
    currentSessionNum: null,
  },
  mutations: {
    newPeriod(state, newPeriodNum) {
      state.currentPeriodNum = newPeriodNum;
    },
    newSession(state, newSessionNum) {
      state.currentSessionNum = newSessionNum;
    },
  },
  actions: {

  },
});
