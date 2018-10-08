<template>
  <b-container :key="$route.fullPath">
    <b-row v-if="allMembers && allMembers.edges">
      <b-card 
        no-body
        v-for="node in allMembers.edges" :key="node.node.id"
        class="mb-1"
      >
        <router-link :to="{ name: 'memberdetail', params: { id: node.node.person.id }}"><img class="card-img-top" :src="node.node.person.externalPhotoUrl" alt="Alt" style="max-width: 12rem"></router-link>
        <b-card-body>
          <h6 class="card-title"><router-link :to="{ name: 'memberdetail', params: { id: node.node.person.id }}">{{ node.node.person.fullName }}</router-link></h6>
        </b-card-body>
      </b-card>
    </b-row>
    <b-row v-if="allMembers && allMembers.totalCount > 20">
      <button @click="showMore">Show More</button>
    </b-row>
  </b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'MemberList',
  data() {
    return {
      members: [],
      errors: [],
      currentPage: Number,
    };
  },
  apollo: {
    allMembers: {
      query: gql`query allMembers($periodNum:Float!, $first:Int!, $after: String, $orderBy: [String]) {
        allMembers(period_PeriodNum:$periodNum, first:$first, after:$after, orderBy:$orderBy) {
          totalCount
          pageInfo {
            startCursor
            endCursor
          }
          edges {
            node {
              id
              person {
                id
                fullName
                externalPhotoUrl
              }
            }
          }
        }
      }`,
      variables() {
        return {
          periodNum: this.$store.state.currentPeriodNum,
          first: 20,
          orderBy: ['person__surname'],
        };
      },
    },
  },
  methods: {
    showMore() {
      this.$apollo.queries.allMembers.fetchMore({
        // New variables
        variables: {
          periodNum: this.$store.state.currentPeriodNum,
          sessionNum: this.$store.state.currentSessionNum,
          person: this.$route.params.id,
          first: 20,
          after: this.allMembers.pageInfo.endCursor,
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newMembers = fetchMoreResult.allMembers.edges;
          const hasMore = fetchMoreResult.allMembers.pageInfo.hasNextPage;
          const pageInfo = fetchMoreResult.allMembers.pageInfo;
          const totalCount = fetchMoreResult.allMembers.totalCount;

          this.showMoreEnabled = hasMore;
          return {
            cursor: pageInfo.endCursor,
            allMembers: {
              __typename: previousResult.allMembers.__typename,
              edges: [...previousResult.allMembers.edges, ...newMembers],
              pageInfo,
              totalCount,
              hasMore,
            },
          };
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
div.card {
  margin: 5px;
}
.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}
</style>