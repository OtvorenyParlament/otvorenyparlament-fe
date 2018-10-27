<template>
  <b-container>
    <b-row v-if="allClubs && allClubs.edges">
      <b-col cols="12" v-for="node in allClubs.edges" :key="node.node.id">
            <router-link :to="{ name: 'clubdetail', params: { id: node.node.id }}">{{ node.node.name }}</router-link>
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
    }
  },
  apollo: {
    allClubs: {
      query: gql`query allClubs($periodNum:Float!) {
        allClubs(period_PeriodNum:$periodNum) {
          edges {
            node {
              id
              name
            }
          }
        }
      }`,
      variables () {
        return {
          periodNum: this.$store.state.currentPeriodNum,
        }
      },
      skip () {
        return this.skipQuery;
      }
    }
  },
  methods: {
    changePage: function (newPage) {
      this.currentPage = newPage;
      this.skipQuery = false;
      this.$apollo.queries.allClubs.refetch();
    }
  },
  created() {
    var currentPage = Number(this.$route.query.page)
    if (!currentPage) {
      currentPage = 1;
    }
    this.changePage(currentPage);
  },
}
</script>
