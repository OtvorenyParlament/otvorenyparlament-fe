<template>
  <div id="app">
    <b-navbar toggleable="md" type="light" variant="light" sticky>
        <b-navbar-brand :to="{path: '/'}">tf</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item :to="{name: 'home'}">{{ $t('message.home') }}</b-nav-item>
            <b-nav-item :to="{name: 'memberlist'}">{{ $t('message.members') }}</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-dropdown v-if="allPeriods && allPeriods.edges" id="ddown1" :text="currentPeriodNumText" class="m-md-2" size="sm">
                <b-dropdown-item v-for="node in allPeriods.edges" :key="node.node.id" @click="changeCurrentPeriodNumText(node.node.periodNum)">{{ node.node.periodNum }}. {{ node.node.yearStart }} - {{ node.node.yearEnd }}</b-dropdown-item>
              </b-dropdown>
              <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <router-view></router-view>
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
              yearStart
              yearEnd
              snapEnd
            }
          }
        }
      }`,
    },
  },
  created() {
    this.changeCurrentPeriodNumText();
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
</style>
