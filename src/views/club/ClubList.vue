<template>
  <b-container>
    <b-row v-if="allClubs && allClubs.edges">
      <b-col>
        <p v-for="node in allClubs.edges" :key="node.node.id">
          <router-link :to="{ name: 'clubdetail', params: { id: node.node.id }}">{{ node.node.name }}</router-link> {{ node.node.currentMemberCount }}&nbsp;členov
          <b-badge variant="success" v-if="node.node.coalition">Koalícia</b-badge>
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="info">Počet členov je zobrazený k aktuálnemu kalendárnemu dňu. Príslušnosť ku klubu je aproximácia vypočítaná podľa klubu, za ktorý v konkrétny deň osoba hlasuje, keďže jednoznačné dátumy od-do nie sú na nrsr.sk zverejňované. Preto ak poslanec opustil/zmenil klub, zmena sa prejaví až ku dňu nasledujúceho hlasovania.</b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'ClubList',
  data() {
    return {
      skipQuery: true,
      clubs: [],
      currentPage: Number,
    };
  },
  apollo: {
    allClubs: {
      query: gql`query allClubs($periodNum:Float!) {
        allClubs(period_PeriodNum:$periodNum) {
          edges {
            node {
              id
              name
              currentMemberCount
              coalition
            }
          }
        }
      }`,
      variables() {
        return {
          periodNum: this.$store.state.currentPeriodNum,
        };
      },
      skip() {
        return this.skipQuery;
      },
    },
  },
  methods: {
    changePage(newPage) {
      this.currentPage = newPage;
      this.skipQuery = false;
      this.$apollo.queries.allClubs.refetch();
    },
  },
  created() {
    let currentPage = Number(this.$route.query.page);
    if (!currentPage) {
      currentPage = 1;
    }
    this.changePage(currentPage);
  },
};
</script>
