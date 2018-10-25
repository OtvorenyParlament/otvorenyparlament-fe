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
      }
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
          orderBy: ['person__surname'],
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
              externalId
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
          orderBy: ['person__surname'],
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
div.card {
  margin: 5px;
}
.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}

.fetch-more-button {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>