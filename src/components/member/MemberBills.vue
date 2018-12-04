<template>
    <b-container v-if="allBills && allBills.edges" class="py-2">
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
import { allBillsQuery } from '@/graphql/AllBillsQuery.gql';

export default {
  name: 'memberBills',
  components: {
    billCard: () => import('@/components/common/BillCard.vue'),
  },
  props: {
    memberId: {type: String, required: false, default: {}},
    skipQuery: { type: Boolean, required: true, default: true},
  },
  data() {
    return {
      showMoreEnabled: false,
    };
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
  methods: {
    showMore(event) {
      this.$apollo.queries.allBills.fetchMore({
        variables: {
          proposer: this.memberId,
          first: 20,
          after: this.allBills.pageInfo.endCursor,
          orderBy: ['-external_id'],
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
  apollo: {
    allBills: {
      query: allBillsQuery,
      variables() {
        return {
          proposer: this.memberId,
          first: 20,
          orderBy: ['-external_id'],
        };
      },
      skip: true,
    },
  },
};
</script>

<style>
</style>