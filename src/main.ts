import Vue from 'vue';
import VueI18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';

import apolloProvider from './apollo';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


import App from './App.vue';
import router from './router';
import store from './store';

import Votes from './components/member/Votes.vue';
import MemberAmendments from './components/member/MemberAmendments.vue';
import MemberOverview from './components/member/MemberOverview.vue';
import MemberCard from './components/member/MemberCard.vue';
import ClubBills from './components/club/ClubBills.vue';
import ClubOverviewTab from './components/club/ClubOverviewTab.vue';
import ClubBillsBillCard from './components/club/ClubBillsBillCard.vue';
import ClubMembers from './components/club/ClubMembers.vue';

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

Vue.component('memberAmendments', MemberAmendments);
Vue.component('votes', Votes);
Vue.component('memberOverview', MemberOverview);
Vue.component('memberCard', MemberCard);
Vue.component('clubMembers', ClubMembers);
Vue.component('clubBills', ClubBills);
Vue.component('clubBillsBillCard', ClubBillsBillCard);
Vue.component('clubOverviewTab', ClubOverviewTab);

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGrin, faFrown, faTimesCircle, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faAdjust, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faGrin);
library.add(faFrown);
library.add(faTimesCircle);
library.add(faCircle);
library.add(faQuestionCircle);
library.add(faAdjust);
Vue.component('font-awesome-icon', FontAwesomeIcon);


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
