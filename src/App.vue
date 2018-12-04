<template>
  <div id="app">
    <b-navbar toggleable="md" type="light" variant="light" sticky>
        <b-navbar-brand :to="{path: '/'}">Otvorený Parlament</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item :to="{name: 'HomeRoute'}">{{ $t('message.home') }}</b-nav-item>
            <b-nav-item :to="{name: 'ClubListRoute'}">{{ $t('message.clubs') }}</b-nav-item>
            <b-nav-item :to="{name: 'MemberListRoute'}">{{ $t('message.members') }}</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-dropdown v-if="allPeriods && allPeriods.edges" id="ddown1" :text="currentPeriodNumText" class="m-md-2" size="sm">
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
              <li><a href="#">Ochrana osobných údajov</a></li>
              <li><a href="#">Zdroje dát</a></li>
              <li><a href="#">Prevádzkovateľ</a></li>
            </ul>
          </b-col>
          <b-col>
            <ul>
              <li><router-link :to="{name: 'APIRoute'}">API</router-link></li>
              <li><a href="#">GitHub</a></li>
            </ul>
          </b-col>
          <b-col>
            3
          </b-col>
        </b-row>
      </footer>
      </b-container>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'App',
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
      + '. ' + this.$t('message.period');
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
</style>
