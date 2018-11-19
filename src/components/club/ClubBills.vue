<template>
    <b-container v-if="allBills && allBills.edges">
      <b-row>
        <b-col>
          <h4>Návrhy zákonov</h4>
          <b-row>
            <b-col>Počet nájdených návrhov: <b-badge>{{ allBills.totalCount }}</b-badge></b-col>
          </b-row>
          <div v-if="allBills && allBills.edges">
            <billCard v-for="(node, index) in allBills.edges"
                      v-bind:bill="node.node"
                      v-bind:index="index"
                      v-bind:key="node.node.id">
            </billCard>
          </div>
        </b-col>
      </b-row>
      <b-row class="text-center fetch-more-button" v-if="allBills.edges && allBills.pageInfo.hasNextPage">
      <b-col>
        <b-button variant="primary" @click="showMore">{{ $t('message.showMore') }}</b-button>
      </b-col>
    </b-row>
    </b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'ClubBills',
  props: {
    clubId: { type: String, required: true, default: '' },
    skipQuery: { type: Boolean, required: true, default: true},
  },
  watch: {
    skipQuery: {
      handler() {
        if (!this.skipQuery) {
          this.$apollo.queries.allBills.skip = false;
        }
      },
    },
  },
  apollo: {
    allBills: {
      query: gql`query allBills($clubId: ID, $first:Int!, $after: String, $orderBy: [String]) {
        allBills(proposers_ClubMemberships_Club:$clubId,
                 first:$first, after:$after, orderBy:$orderBy) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              delivered
              press {
                id
                title
              }
              state
              result
            }
          }
        }
      }`,
      variables() {
        return {
          clubId: this.clubId,
          first: 20,
          orderBy: ['-delivered'],
        };
      },
      skip: true,
    },
  },
  methods: {
    showMore(event) {
      this.$apollo.queries.allBills.fetchMore({
        variables: {
          periodNum: this.$store.state.currentPeriodNum,
          first: 20,
          after: this.allBills.pageInfo.endCursor,
          orderBy: ['-delivered'],
          isActive: this.isActive,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newBills = fetchMoreResult.allBills.edges;
          const hasMore = fetchMoreResult.allBills.pageInfo.hasNextPage;
          const pageInfo = fetchMoreResult.allBills.pageInfo;
          const totalCount = fetchMoreResult.allBills.totalCount;

          return {
            cursor: pageInfo.endCursor,
            allBills: {
              __typename: previousResult.allBills.__typename,
              edges: [...previousResult.allBills.edges, ...newBills],
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

<style>

</style>
