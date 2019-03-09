<template>
  <div id="app">
    <b-navbar toggleable="md" type="light" variant="light" sticky>
        <b-navbar-brand :to="{path: '/'}"><img src="./assets/img/op-logo.png" width="105"></b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item :to="{name: 'HomeRoute'}">Domov</b-nav-item>
            <b-nav-item :to="{name: 'ClubListRoute'}">Kluby</b-nav-item>
            <b-nav-item :to="{name: 'MemberListRoute'}">Poslanci</b-nav-item>
            <b-nav-item :to="{name: 'HowToInterpretDataRoute'}">Ako interpretovať údaje</b-nav-item>
            <b-nav-item :to="{name: 'ContactRoute'}">Upozornite nás na chybu</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-dropdown right v-if="allPeriods && allPeriods.edges" id="ddown1" :text="currentPeriodNumText" class="m-md-2" size="sm">
                <b-dropdown-item v-for="node in allPeriods.edges" :key="node.node.id" @click="changeCurrentPeriodNumText(node.node.periodNum)">{{ node.node.periodNum }}. {{ node.node.startDate }} - {{ node.node.endDate }}</b-dropdown-item>
              </b-dropdown>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <router-view></router-view>
    <div class="footer-block">
      <b-container>
        <footer>
        <b-row>
          <b-col>
            <ul>
              <li><router-link :to="{name: 'AboutUsRoute'}">O nás</router-link></li>
              <li><router-link :to="{name: 'DataSourceRoute'}">Zdroje dát</router-link></li>
              <li><router-link :to="{name: 'ContactRoute'}">Upozornite nás na chybu</router-link></li>
            </ul>
          </b-col>
          <b-col>
            <ul>
              <li><router-link :to="{name: 'APIRoute'}">API</router-link></li>
              <li><a href="https://github.com/otvorenyparlament" target="_blank">GitHub</a></li>
            </ul>
          </b-col>
          <b-col>
            <ul>
              <li><b><router-link :to="{name: 'GDPRRoute'}">GDPR</router-link></b></li>
              <li><router-link :to="{name: 'PersonConcernedRoute'}">Dotknuté osoby</router-link></li>
              <li><router-link :to="{name: 'DataBalancingTestRoute'}">Test rovnováhy</router-link></li>
              <li><router-link :to="{name: 'CookiesRoute'}">Cookies</router-link></li>
            </ul>
          </b-col>
        </b-row>
        <cookie-law theme="base" buttonClass="btn btn-primary" buttonText="Rozumiem">
          <div slot="message">
            Tento web používa súbory cookie na poskytovanie služieb a analýzu webu. Používaním tohto webu vyjadrujete svoj súhlas s používaním súborov cookie.
            <router-link class="cookie-accept-more-info" :to="{name: 'Cookiesroute'}">Viac info</router-link>
          </div>
        </cookie-law>
      </footer>
      </b-container>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import CookieLaw from 'vue-cookie-law';

export default {
  name: 'App',
  components: {
    CookieLaw,
  },
  metaInfo: {
    title: 'Domov',
    titleTemplate: '%s | otvorenyparlament.info',
  },
  data() {
    return {
      periods: [],
      currentPeriodNumText: String,
      appOperator: String,
    };
  },
  apollo: {
    allPeriods: {
      query: gql`query {
        allPeriods {
          edges {
            node {
              id
              periodNum
              startDate
              endDate
              snapEnd
            }
          }
        }
      }`,
    },
  },
  created() {
    this.changeCurrentPeriodNumText();
    this.appOperator = process.env.VUE_APP_OPERATOR;
  },
  methods: {
    changeCurrentPeriodNumText(newPeriodNum) {
      if (newPeriodNum) {
        this.$store.commit('newPeriod', newPeriodNum);
      }
      this.currentPeriodNumText = (this.$store.state.currentPeriodNum || process.env.VUE_APP_DEFAULT_PERIOD)
      + '. obdobie';
    },
  },
};
</script>

<style lang="scss">
nav.navbar {
    margin-bottom: 20px;
}

.footer-block {
  background-color: #5a6268;
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  color: #f2f2f2;
}

.footer-block li {
  list-style-type: none;
}

.footer-block a {
  color: #f2f2f2;
}

.cookie-accept-more-info {
  color: #007bff !important;
}
</style>
