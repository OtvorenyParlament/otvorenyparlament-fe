<template>
  <b-container :key="$route.fullPath" v-if="allMembers && allMembers.edges">
    <b-row>
      <b-col>
        <b-form-checkbox id="is-active"
          v-model=isActive
          :value=getToday()
          :disabled=!isCurrentPeriodDefault()
          :unchecked-value=null
          @change=getIsActive()>
      Vykonáva mandát
    </b-form-checkbox>
      </b-col>
      <b-col>
        <b-form-select v-model="clubSelected" :options="clubOptions" class="mb-1" label="Poslanecký klub" />
      </b-col>
    </b-row>
    <b-row><b-col>Nájdených poslancov: {{ allMembers.totalCount }}</b-col></b-row>
    <b-row>
      <memberCard v-for="(node, index) in allMembers.edges"
                    v-bind:member="node.node"
                    v-bind:index="index"
                    v-bind:key="node.node.id">
      </memberCard>
    </b-row>
    <b-row class="text-center fetch-more-button" v-if="allMembers && allMembers.pageInfo.hasNextPage">
      <b-col>
        <b-button variant="primary" @click="showMore">{{ $t('message.showMore') }}</b-button>
      </b-col>
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
      clubSelected: null,
      clubOptions: [{value: null, text: ' -- Všetky poslanecké kluby -- '}],
      isActive: null,
    };
  },
  created() {
    this.isActive = this.getIsActive();
  },
  watch: {
    '$store.state.currentPeriodNum': {
      handler() {
        this.isActive = this.getIsActive();
      },
    },
  },
  apollo: {
    allMembers: {
      query: gql`query allMembers($periodNum:Float!, $first:Int!, $after: String, $orderBy: [String], $isActive: Date) {
        allMembers(period_PeriodNum:$periodNum, first:$first, after:$after, orderBy:$orderBy, isActive:$isActive) {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
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
          orderBy: ['person__surname', 'person__forename'],
          isActive: this.isActive,
        };
      },
    },
    allClubs: {
      query: gql`query allClubs($periodNum:Float!) {
        allClubs(period_PeriodNum:$periodNum, first:100) {
          edges {
            node {
              id
              name
            }
          }
        }
      }`,
      variables() {
        return {
          periodNum: this.$store.state.currentPeriodNum,
        };
      },
      result(data) {
        const clubOptions = [
          {value: null, text: ' -- Všetky poslanecké kluby -- '},
          {value: false, text: ' -- Nezaradení -- '},
        ];
        for (const club of data.data.allClubs.edges) {
          clubOptions.push({value: club.node.id, text: club.node.name});
        }
        this.clubOptions = clubOptions;
      },
    },
  },
  methods: {
    isCurrentPeriodDefault() {
      if (parseInt(process.env.VUE_APP_DEFAULT_PERIOD, 10) === this.$store.state.currentPeriodNum) {
        return true;
      }
      return false;
    },
    getIsActive() {
      if (this.isCurrentPeriodDefault()) {
        return this.getToday();
      }
      return null;
    },
    getToday() {
      const toTwoDigits = (num) => num < 10 ? '0' + num : num;
      const today = new Date();
      const year = today.getFullYear();
      const month = toTwoDigits(today.getMonth() + 1);
      const day = toTwoDigits(today.getDate());
      return `${year}-${month}-${day}`;
    },
    showMore(event) {
      this.$apollo.queries.allMembers.fetchMore({
        variables: {
          periodNum: this.$store.state.currentPeriodNum,
          first: 20,
          after: this.allMembers.pageInfo.endCursor,
          orderBy: ['person__surname', 'person__forename'],
          isActive: this.isActive,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newMembers = fetchMoreResult.allMembers.edges;
          const hasMore = fetchMoreResult.allMembers.pageInfo.hasNextPage;
          const pageInfo = fetchMoreResult.allMembers.pageInfo;
          const totalCount = fetchMoreResult.allMembers.totalCount;

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
.fetch-more-button {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>