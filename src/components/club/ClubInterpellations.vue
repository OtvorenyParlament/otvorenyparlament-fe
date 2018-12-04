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
        <b-button variant="primary" @click="showMore">{{ $t('message.showMore') }}</b-button>
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
    clubId: { type: String, required: true, default: '' },
    skipQuery: { type: Boolean, required: true, default: true},
  },
  watch: {
    skipQuery: {
      handler() {
        if (!this.skipQuery) {
          this.$apollo.queries.allInterpellations.skip = false;
        }
      },
    },
  },
  apollo: {
    allInterpellations: {
      query: allInterpellationsQuery,
      variables() {
        return {
          clubId: this.clubId,
          first: 20,
          orderBy: ['-external_id'],
        };
      },
      skip: true,
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
          isActive: this.isActive,
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
