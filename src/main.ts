import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import apolloProvider from './apollo';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

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
