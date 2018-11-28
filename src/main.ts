import Vue from 'vue';
import VueI18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';

import apolloProvider from './apollo';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


import App from './App.vue';
import router from './router';
import store from './store';

import AmendmentCard from './components/common/AmendmentCard.vue';
import BillCard from './components/common/BillCard.vue';
import DebateAppearanceCard from './components/common/DebateAppearanceCard.vue';
import InterpellationCard from './components/common/InterpellationCard.vue';
import MemberCard from './components/common/MemberCard.vue';
import VotingCard from './components/common/VotingCard.vue';

import ClubAmendments from './components/club/ClubAmendments.vue';
import ClubBills from './components/club/ClubBills.vue';
import ClubDebateAppearances from './components/club/ClubDebateAppearances.vue';
import ClubInterpellations from './components/club/ClubInterpellations.vue';
import ClubMembers from './components/club/ClubMembers.vue';
import ClubMemberSeatChart from './components/club/ClubMemberSeatChart.vue';
import ClubMemberPolarityChart from './components/club/ClubMemberPolarityChart.vue';
import ClubOverviewTab from './components/club/ClubOverviewTab.vue';

import MemberAmendments from './components/member/MemberAmendments.vue';
import MemberBills from './components/member/MemberBills.vue';
import MemberDebateAppearances from './components/member/MemberDebateAppearances.vue';
import MemberInterpellations from './components/member/MemberInterpellations.vue';
import MemberOverview from './components/member/MemberOverview.vue';
import MemberVotings from './components/member/MemberVotings.vue';

import VotingPie from './components/VotingPie.vue';

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

Vue.component('amendmentCard', AmendmentCard);
Vue.component('billCard', BillCard);
Vue.component('debateAppearanceCard', DebateAppearanceCard);
Vue.component('interpellationCard', InterpellationCard);
Vue.component('memberCard', MemberCard);
Vue.component('votingCard', VotingCard);

Vue.component('clubAmendments', ClubAmendments);
Vue.component('clubBills', ClubBills);
Vue.component('clubDebateAppearances', ClubDebateAppearances);
Vue.component('clubInterpellations', ClubInterpellations);
Vue.component('clubMembers', ClubMembers);
Vue.component('clubMemberSeatChart', ClubMemberSeatChart);
Vue.component('clubMemberPolarityChart', ClubMemberPolarityChart);
Vue.component('clubOverviewTab', ClubOverviewTab);

Vue.component('memberAmendments', MemberAmendments);
Vue.component('memberBills', MemberBills);
Vue.component('memberDebateAppearances', MemberDebateAppearances);
Vue.component('memberInterpellations', MemberInterpellations),
Vue.component('memberOverview', MemberOverview);
Vue.component('memberVotings', MemberVotings);

Vue.component('votingPie', VotingPie);

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
