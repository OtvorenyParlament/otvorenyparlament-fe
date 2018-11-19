<template>
<b-container v-if="allDebateAppearances && allDebateAppearances.edges">
      <b-row>
        <b-col>
          <h4>Vystúpenia v rozprave</h4>
          <b-row>
            <b-col>Počet nájdených vystúpení: <b-badge>{{ allDebateAppearances.totalCount }}</b-badge></b-col>
          </b-row>
          <div v-if="allDebateAppearances && allDebateAppearances.edges">
            <debateAppearanceCard v-for="(node, index) in allDebateAppearances.edges"
                      v-bind:debateAppearance="node.node"
                      v-bind:index="index"
                      v-bind:key="node.node.id">
            </debateAppearanceCard>
          </div>
        </b-col>
      </b-row>
      <b-row class="text-center fetch-more-button" v-if="allDebateAppearances.edges && allDebateAppearances.pageInfo.hasNextPage">
      <b-col>
        <b-button variant="primary" @click="showMore">{{ $t('message.showMore') }}</b-button>
      </b-col>
    </b-row>
    </b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'ClubDebateAppearances',
  props: {
    clubId: { type: String, required: true, default: '' },
    skipQuery: { type: Boolean, required: true, default: true},
  },
  watch: {
    skipQuery: {
      handler() {
        if (!this.skipQuery) {
          this.$apollo.queries.allDebateAppearances.skip = false;
        }
      },
    },
  },
  apollo: {
    allDebateAppearances: {
      query: gql`query allDebateAppearances($clubId: ID, $first:Int!, $after: String, $orderBy: [String]) {
        allDebateAppearances(club:$clubId,
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
              externalId
              start
              text
            }
          }
        }
      }`,
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
      this.$apollo.queries.allDebateAppearances.fetchMore({
        variables: {
          periodNum: this.$store.state.currentPeriodNum,
          first: 20,
          after: this.allDebateAppearances.pageInfo.endCursor,
          orderBy: ['-external_id'],
          isActive: this.isActive,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newDebateAppearances = fetchMoreResult.allDebateAppearances.edges;
          const hasMore = fetchMoreResult.allDebateAppearances.pageInfo.hasNextPage;
          const pageInfo = fetchMoreResult.allDebateAppearances.pageInfo;
          const totalCount = fetchMoreResult.allDebateAppearances.totalCount;

          return {
            cursor: pageInfo.endCursor,
            allDebateAppearances: {
              __typename: previousResult.allDebateAppearances.__typename,
              edges: [...previousResult.allDebateAppearances.edges, ...newDebateAppearances],
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
