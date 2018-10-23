<template>
<b-container v-if="allVotingVotes && allVotingVotes.edges" class="py-2">
    <b-row>
      <b-col>
        <ul>
          <li><font-awesome-icon :icon="['far', 'grin']" /> - Za</li>
          <li><font-awesome-icon :icon="['far', 'frown']" /> - Proti</li>
          <li><font-awesome-icon :icon="['far', 'times-circle']" /> - Nehlasoval(a)</li>
          <li><font-awesome-icon :icon="['fas', 'adjust']" /> - Zdržal(a) sa</li>
          <li><font-awesome-icon :icon="['fas', 'circle']" /> - Neprítomná/ý</li>
        </ul>
      </b-col>
      <b-col>
        <b-row>
          {{ $t('message.session') }}: <b-dropdown v-if="allSessions && allSessions.edges" id="sessionNumDropdown" :text="currentSessionNumText" class="m-md-2" size="sm">
            <b-dropdown-item @click="changeCurrentSessionNumText(null)">{{ $t('message.allSessions') }}</b-dropdown-item>
            <b-dropdown-item v-for="node in allSessions.edges" :key="node.node.id" @click="changeCurrentSessionNumText(node.node.sessionNum)">{{ node.node.sessionNum }}. {{ $t('message.session') }}</b-dropdown-item>
          </b-dropdown>
        </b-row>
        <b-row>
          <b-col>Počet hlasovaní: <b-badge>{{ allVotingVotes.totalCount }}</b-badge></b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row v-for="vote in allVotingVotes.edges" :key="vote.node.id">
        <div class="col-auto text-center flex-column d-none d-sm-flex">
            <b-col>&nbsp;</b-col>
            <h5 class="m-2">
                <span class="badge badge-pill bg-light border">
                  <font-awesome-icon v-if="vote.node.vote == 'Z'" :icon="['far', 'grin']" />
                  <font-awesome-icon v-else-if="vote.node.vote == 'P'" :icon="['far', 'frown']" />
                  <font-awesome-icon v-else-if="vote.node.vote == 'N'" :icon="['far', 'times-circle']" />
                  <font-awesome-icon v-else-if="vote.node.vote == '_'" :icon="['fas', 'adjust']" />
                  <font-awesome-icon v-else-if="vote.node.vote == 'A_0'" :icon="['fas', 'circle']" />
                </span>
            </h5>
            <b-col>&nbsp;</b-col>
        </div>
        <div class="col py-2">
            <b-card>
                <div class="float-right text-muted">{{ vote.node.voting.timestamp }}</div>
                <p class="card-text">{{ vote.node.voting.topic }}</p>
                <p>Výsledok: {{ vote.node.voting.result }}</p>
            </b-card>
        </div>
    </b-row>
    <b-row class="text-center fetch-more-button" v-if="allVotingVotes.edges && allVotingVotes.totalCount > 20">
      <b-col>
        {{ showMoreEnabled }}
        <b-button variant="primary" @click="showMore">{{ $t('message.showMore') }}</b-button>
      </b-col>
    </b-row>
</b-container>
</template>
<script>
import gql from 'graphql-tag';

export default {
  name: 'votes',
  props: {
    person: {type: Object, required: false, default: {}},
  },
  data() {
    return {
      currentSessionNumText: String,
      showMoreEnabled: Boolean,
    };
  },
  apollo: {
    allVotingVotes: {
      query: gql`
        query allVotingVotes($periodNum: Float!, $person: ID!, $first: Int!,
                             $sessionNum: Float, $after: String, $orderBy: [String]) {
          allVotingVotes(voting_Session_Period_PeriodNum:$periodNum, person:$person, orderBy:$orderBy,
                         first:$first, after:$after, voting_Session_SessionNum:$sessionNum) {
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
                vote
                voting {
                  id
                  topic
                  timestamp
                  result
                  session {
                    id
                    sessionNum
                  }
                  press {
                    id
                    title
                    pressType
                    pressNum
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          periodNum: this.$store.state.currentPeriodNum,
          sessionNum: this.$store.state.currentSessionNum,
          person: this.$route.params.id,
          first: 20,
          orderBy: ['-voting__timestamp'],
        };
      },
    },
    allSessions: {
      query: gql`
        query allSessions($periodNum: Float!, $orderBy: [String]) {
          allSessions(period_PeriodNum:$periodNum, orderBy:$orderBy) {
            totalCount
            edges {
              node {
                id
                sessionNum
                name
              }
            }
          }
        }
      `,
      variables() {
        return {
          periodNum: this.$store.state.currentPeriodNum,
        };
      },
    },
  },
  created() {
    this.$store.commit('newSession', null);
    this.changeCurrentSessionNumText();
  },
  methods: {
    showMore() {
      // Fetch more data and transform the original result
      this.$apollo.queries.allVotingVotes.fetchMore({
        // New variables
        variables: {
          periodNum: this.$store.state.currentPeriodNum,
          sessionNum: this.$store.state.currentSessionNum,
          person: this.$route.params.id,
          first: 20,
          after: this.allVotingVotes.pageInfo.endCursor,
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newVotes = fetchMoreResult.allVotingVotes.edges;
          const hasMore = fetchMoreResult.allVotingVotes.pageInfo.hasNextPage;
          const pageInfo = fetchMoreResult.allVotingVotes.pageInfo;
          const totalCount = fetchMoreResult.allVotingVotes.totalCount;

          this.showMoreEnabled = hasMore;
          return {
            cursor: pageInfo.endCursor,
            allVotingVotes: {
              __typename: previousResult.allVotingVotes.__typename,
              edges: [...previousResult.allVotingVotes.edges, ...newVotes],
              pageInfo,
              totalCount,
              hasMore,
            },
          };
        },
      });
    },
    changeCurrentSessionNumText(newSessionNum) {
      if (newSessionNum) {
        this.$store.commit('newSession', newSessionNum);
      } else {
        this.$store.commit('newSession', null);
      }
      if (this.$store.state.currentSessionNum) {
        this.currentSessionNumText = (this.$store.state.currentSessionNum) + '. ' + this.$t('message.session');
      } else {
        this.currentSessionNumText = this.$t('message.allSessions');
      }
      this.$apollo.queries.allVotingVotes.refetch({
        sessionNum: this.$store.state.currentSessionNum,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.badge-pill {
  padding: .6em;
}

ul {
  padding-left: 0;
  list-style-type: none;
}
</style>
