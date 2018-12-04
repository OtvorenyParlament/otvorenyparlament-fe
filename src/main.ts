import Vue from 'vue';
import VueI18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';

import apolloProvider from './apollo';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = true;


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
      notAPeriodMember: 'Not a PM in selected period',
      sessions: 'sessions',
      session: 'session',
      allSessions: 'All Sessions',
      allVotings: 'votings',
      voting: 'voting',
      votings: 'votings',
      showMore: 'Show More',
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
      notAPeriodMember: 'Nie je poslancom vo vybranom období',
      sessions: 'schôdze',
      session: 'schôdza',
      allSessions: 'Všetky schôdze',
      allVotings: 'hlasovania',
      voting: 'hlasovanie',
      votings: 'hlasovania',
      showMore: 'Zobraz ďalšie',
    },
  },
};

Vue.use(BootstrapVue);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'sk', // set locale
  messages, // set locale messages
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
  i18n,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
