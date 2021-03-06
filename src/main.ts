import Vue from 'vue';
import Meta from 'vue-meta';
import BootstrapVue from 'bootstrap-vue';

import apolloProvider from './apollo';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


import App from './App.vue';
import router from './router';
import store from './store';

import VueAnalytics from 'vue-analytics';

Vue.config.productionTip = false;

Vue.use(Meta);
Vue.use(BootstrapVue);
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GA_TRACKING_CODE,
  router,
  set: [
    {field: 'anonymizeIp', value: true},
  ],
  autoTracking: {
  },
});

Vue.mixin({
  methods: {
    formatDate(isoString: string, option: string) {
      const dateObj = new Date(Date.parse(isoString));
      let options = {};
      if (option === 'notime') {
        options = {day: '2-digit', month: '2-digit', year: 'numeric'};
      }
      return dateObj.toLocaleString('sk-SK', options);
    },
  },
});

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
