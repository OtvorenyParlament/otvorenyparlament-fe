<template>
<b-container v-if="allInterpellations && allInterpellations.edges">
      <b-row>
        <b-col>
          <h4>Interpelácie</h4>
          <b-row>
            <b-col>Počet nájdených interpelácií: <b-badge>{{ allInterpellations.totalCount }}</b-badge></b-col>
          </b-row>
          <div v-if="allInterpellations && allInterpellations.edges">
            <interpellationCard v-for="(node, index) in allInterpellations.edges"
                      v-bind:interpellation="node.node"
                      v-bind:index="index"
                      v-bind:key="node.node.id">
            </interpellationCard>
          </div>
        </b-col>
      </b-row>
      <b-row class="text-center fetch-more-button" v-if="allInterpellations.edges && allInterpellations.pageInfo.hasNextPage">
      <b-col>
        <b-button variant="primary" @click="showMore">Zobraziť viac</b-button>
      </b-col>
    </b-row>
    </b-container>
</template>

<script>
import gql from 'graphql-tag';
import { allInterpellationsQuery } from '@/graphql/AllInterpellationsQuery.gql';

export default {
  name: 'ClubInterpellations',
  components: {
    interpellationCard: () => import('@/components/common/InterpellationCard.vue'),
  },
  props: {
    memberId: { type: String, required: true, default: '' },
    skipQuery: { type: Boolean, required: true, default: true},
  },
  apollo: {
    allInterpellations: {
      query: allInterpellationsQuery,
      variables() {
        return {
          askedBy: this.memberId,
          first: 20,
          orderBy: ['-external_id'],
        };
      },
      skip() {
        if (typeof this !== 'undefined') {
          return this.skipQuery;
        } else {
          return true;
        }
      },
    },
  },
  methods: {
    showMore(event) {
      this.$apollo.queries.allInterpellations.fetchMore({
        variables: {
          periodNum: this.$store.state.currentPeriodNum,
          first: 20,
          after: this.allInterpellations.pageInfo.endCursor,
          orderBy: ['-external_id'],
          askedBy: this.memberId,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newInterpellations = fetchMoreResult.allInterpellations.edges;
          const hasMore = fetchMoreResult.allInterpellations.pageInfo.hasNextPage;
          const pageInfo = fetchMoreResult.allInterpellations.pageInfo;
          const totalCount = fetchMoreResult.allInterpellations.totalCount;

          return {
            cursor: pageInfo.endCursor,
            allInterpellations: {
              __typename: previousResult.allInterpellations.__typename,
              edges: [...previousResult.allInterpellations.edges, ...newInterpellations],
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
