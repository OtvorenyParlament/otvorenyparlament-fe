<template>
<b-container v-if="allAmendments && allAmendments.edges">
      <b-row>
        <b-col>
          <h4>Návrhy</h4>
          <b-row>
            <b-col>Počet nájdených návrhov: <b-badge>{{ allAmendments.totalCount }}</b-badge></b-col>
          </b-row>
          <div v-if="allAmendments && allAmendments.edges">
            <amendmentCard v-for="(node, index) in allAmendments.edges"
                      v-bind:amendment="node.node"
                      v-bind:index="index"
                      v-bind:key="node.node.id">
            </amendmentCard>
          </div>
        </b-col>
      </b-row>
      <b-row class="text-center fetch-more-button" v-if="allAmendments.edges && allAmendments.pageInfo.hasNextPage">
      <b-col>
        <b-button variant="primary" @click="showMore">{{ $t('message.showMore') }}</b-button>
      </b-col>
    </b-row>
    </b-container>
</template>

<script>
import gql from 'graphql-tag';
import { allAmendmentsQuery } from '@/graphql/AllAmendmentsQuery.gql';

export default {
  name: 'ClubAmendments',
  components: {
    amendmentCard: () => import('@/components/common/AmendmentCard.vue'),
  },
  props: {
    clubId: { type: String, required: true, default: '' },
    skipQuery: { type: Boolean, required: true, default: true},
  },
  watch: {
    skipQuery: {
      handler() {
        if (!this.skipQuery) {
          this.$apollo.queries.allAmendments.skip = false;
        }
      },
    },
  },
  apollo: {
    allAmendments: {
      query: allAmendmentsQuery,
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
      this.$apollo.queries.allAmendments.fetchMore({
        variables: {
          periodNum: this.$store.state.currentPeriodNum,
          first: 20,
          after: this.allAmendments.pageInfo.endCursor,
          orderBy: ['-external_id'],
          isActive: this.isActive,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newAmendments = fetchMoreResult.allAmendments.edges;
          const hasMore = fetchMoreResult.allAmendments.pageInfo.hasNextPage;
          const pageInfo = fetchMoreResult.allAmendments.pageInfo;
          const totalCount = fetchMoreResult.allAmendments.totalCount;

          return {
            cursor: pageInfo.endCursor,
            allAmendments: {
              __typename: previousResult.allAmendments.__typename,
              edges: [...previousResult.allAmendments.edges, ...newAmendments],
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
