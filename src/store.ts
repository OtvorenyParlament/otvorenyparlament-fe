import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPeriodNum: parseInt((process.env.VUE_APP_DEFAULT_PERIOD || ''), 10),
    currentSessionId: null,
  },
  mutations: {
    newPeriod(state, newPeriodNum) {
      state.currentPeriodNum = parseInt(newPeriodNum, 10);
    },
    newSession(state, newSessionId) {
      state.currentSessionId = newSessionId;
    },
  },
  actions: {

  },
});
