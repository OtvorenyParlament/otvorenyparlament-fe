import Vue from 'vue';
import VueI18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';

import apolloProvider from './apollo';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;


const messages = {
  en: {
    message: {
      home: 'home',
      members: 'members',
      member: 'member',
      clubs: 'clubs',
      club: 'club',
      period: 'period',
      periods: 'periods',
    },
  },
  sk: {
    message: {
      home: 'domov',
      members: 'poslanci',
      member: 'poslanec',
      clubs: 'kluby',
      club: 'klub',
      period: 'obdobie',
      periods: 'obdobia',
    },
  },
};

Vue.use(BootstrapVue);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'sk', // set locale
  messages, // set locale messages
});

new Vue({
  router,
  store,
  i18n,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
