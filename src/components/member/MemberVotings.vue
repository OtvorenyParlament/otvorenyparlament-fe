<template>
<b-container v-if="allVotingVotes && allVotingVotes.edges" class="py-2">
    <b-row>
      <b-col>
        <p>Zobrazené hlasy:</p>
        <ul>
          <li>
            <b-form-checkbox id="exclude-for"
                     v-model="excludeFor"
                     :value=false
                     :unchecked-value=true><font-awesome-icon :icon="['far', 'grin']" /> - Za
            </b-form-checkbox>
          </li>
          <li>
            <b-form-checkbox id="exclude-against"
                     v-model="excludeAgainst"
                     :value=false
                     :unchecked-value=true>
              <font-awesome-icon :icon="['far', 'frown']" /> - Proti
            </b-form-checkbox>
          </li>
          <li>
            <b-form-checkbox id="exclude-dnv"
                     v-model="excludeDNV"
                     :value=false
                     :unchecked-value=true>
              <font-awesome-icon :icon="['far', 'times-circle']" /> - Nehlasoval(a)
            </b-form-checkbox>
          </li>
          <li>
            <b-form-checkbox id="exclude-abstain"
                     v-model="excludeAbstain"
                     :value=false
                     :unchecked-value=true>
              <font-awesome-icon :icon="['fas', 'adjust']" /> - Zdržal(a) sa
            </b-form-checkbox>
          </li>
          <li>
            <b-form-checkbox id="exclude-absent"
                     v-model="excludeAbsent"
                     :value=false
                     :unchecked-value=true>
              <font-awesome-icon :icon="['fas', 'circle']" /> - Neprítomná/ý
            </b-form-checkbox>
          </li>
        </ul>
      </b-col>
      <b-col>
        <b-row>
          <b-col>
            <b-form-select v-model="sessionSelected" :options="sessionOptions" class="mb-3" />
          </b-col>
        </b-row>
        <b-row>
          <b-col>Počet nájdených hlasovaní: <b-badge>{{ allVotingVotes.totalCount }}</b-badge></b-col>
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
            <votingCard
                      v-bind:voting="vote.node.voting"
                      v-bind:key="vote.node.voting.id">
            </votingCard>

        </div>
    </b-row>
    <b-row class="text-center fetch-more-button" v-if="allVotingVotes.edges && allVotingVotes.pageInfo.hasNextPage">
      <b-col>
        <b-button variant="primary" @click="showMore">{{ $t('message.showMore') }}</b-button>
      </b-col>
    </b-row>
</b-container>
</template>
<script>
import gql from 'graphql-tag';


export default {
  name: 'MemberVotings',
  props: {
    person: {type: Object, required: false, default: {}},
    skipQuery: { type: Boolean, required: true, default: true},
  },
  data() {
    return {
      sessionSelected: null,
      sessionOptions: [{value: null, text: ' -- Všetky schôdze -- '}],
      showMoreEnabled: false,
      excludeFor: false,
      excludeAgainst: false,
      excludeDNV: false,
      excludeAbstain: false,
      excludeAbsent: false,
    };
  },
  apollo: {
    allVotingVotes: {
      query: gql`
        query allVotingVotes($periodNum: Float!, $person: ID!, $first: Int!,
                             $sessionId: ID,
                             $excludeFor: Boolean, $excludeAgainst: Boolean, $excludeDNV: Boolean,
                             $excludeAbstain: Boolean, $excludeAbsent: Boolean,
                             $after: String, $orderBy: [String]) {
          allVotingVotes(voting_Session_Period_PeriodNum:$periodNum, voter_Person:$person,
                         excludeFor:$excludeFor, excludeAgainst: $excludeAgainst,
                         excludeDnv: $excludeDNV, excludeAbstain: $excludeAbstain,
                         excludeAbsent: $excludeAbsent,
                         orderBy:$orderBy,
                         first:$first, after:$after, voting_Session:$sessionId) {
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
                  resultDisplay
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
          sessionId: this.$store.state.currentSessionId,
          person: this.$route.params.id,
          first: 20,
          orderBy: ['-voting__timestamp'],
          excludeFor: this.excludeFor,
          excludeAgainst: this.excludeAgainst,
          excludeDNV: this.excludeDNV,
          excludeAbstain: this.excludeAbstain,
          excludeAbsent: this.excludeAbsent,
        };
      },
      skip: true,
      result(data) {
        this.$apollo.queries.allSessions.skip = false;
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
      skip: true,
      result(data) {
        const sessionOptions = [
          {value: null, text: ' -- Všetky schôdze -- '},
        ];
        for (const session of data.data.allSessions.edges) {
          sessionOptions.push({value: session.node.id, text: session.node.name});
        }
        this.sessionOptions = sessionOptions;
      },
    },
  },
  created() {
    this.$store.commit('newSession', null);
  },
  watch: {
    sessionSelected: {
      handler() {
        this.changeCurrentSession();
      },
    },
    skipQuery: {
      handler() {
        if (!this.skipQuery) {
          this.$apollo.queries.allVotingVotes.skip = false;
        }
      },
    },
  },
  methods: {
    parseDate(isoString) {
      const dateObj = new Date(Date.parse(isoString));
      return dateObj.toLocaleString('sk-SK');
    },
    showMore() {
      // Fetch more data and transform the original result
      this.$apollo.queries.allVotingVotes.fetchMore({
        variables: {
          periodNum: this.$store.state.currentPeriodNum,
          sessionId: this.$store.state.currentSessionId,
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
    changeCurrentSession(fuck) {
      this.$store.commit('newSession', this.sessionSelected);
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
