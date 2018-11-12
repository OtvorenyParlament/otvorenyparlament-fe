<template>
<b-container v-if="allClubMembers">
  <b-row>
      <b-col>
        <b-form-checkbox id="is-current-member"
          v-model=isCurrentMember
          :value=getToday()
          :disabled=!isCurrentPeriodDefault()
          :unchecked-value=null
          @change=getIsCurrentMember()>
      Aktívne členstvo k dnešnému dňu
    </b-form-checkbox>
      </b-col>
    </b-row>
  <b-row><b-col>Nájdených poslancov: {{ allClubMembers.totalCount }}</b-col></b-row>
    <b-row v-if="allClubMembers && allClubMembers.edges">
    <memberCard v-for="(node, index) in allClubMembers.edges"
                v-bind:member="node.node.member"
                v-bind:index="index"
                v-bind:key="node.node.member.id">
    </memberCard>
</b-row>
<b-row class="text-center fetch-more-button" v-if="allClubMembers && allClubMembers.pageInfo.hasNextPage">
      <b-col>
        <b-button variant="primary" @click="showMore">{{ $t('message.showMore') }}</b-button>
      </b-col>
    </b-row>
</b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'ClubMembers',
  data() {
    return {
      isCurrentMember: null,
    };
  },
  created() {
    this.isCurrentMember = this.getIsCurrentMember();
    // this.$apollo.queries.allClubMembers.skip = false;
  },
  watch: {
    '$store.state.currentPeriodNum': {
      handler() {
        this.isCurrentMember = this.getIsCurrentMember();
      },
    },
  },
  props: {
    clubId: { type: String, required: true, default: '' },
  },
  apollo: {
    allClubMembers: {
      query: gql`
        query allClubMembers(
          $club: ID!
          $first: Int!
          $after: String
          $orderBy: [String]
          $isCurrentMember: Date
        ) {
          allClubMembers(
            club: $club
            isCurrentMember: $isCurrentMember
            first: $first
            after: $after
            orderBy: $orderBy
          ) {
            totalCount
            pageInfo {
              startCursor
              endCursor
              hasNextPage
            }
            edges {
              node {
                id
                member {
                  id
                  person {
                    id
                    fullName
                    externalPhotoUrl
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          club: this.clubId,
          first: 20,
          orderBy: ['member__person__surname', 'member__person__forename'],
          isCurrentMember: this.isCurrentMember,
        };
      },
      skip: true,
    },
  },
  methods: {
    isCurrentPeriodDefault() {
      if (
        parseInt(process.env.VUE_APP_DEFAULT_PERIOD, 10) ===
        this.$store.state.currentPeriodNum
      ) {
        return true;
      }
      return false;
    },
    getIsCurrentMember() {
      if (this.isCurrentPeriodDefault()) {
        return this.getToday();
      }
      return null;
    },
    getToday() {
      const toTwoDigits = ( num ) => (num < 10 ? '0' + num : num);
      const today = new Date();
      const year = today.getFullYear();
      const month = toTwoDigits(today.getMonth() + 1);
      const day = toTwoDigits(today.getDate());
      return `${year}-${month}-${day}`;
    },
    showMore(event) {
      this.$apollo.queries.allClubMembers.fetchMore({
        variables: {
          periodNum: this.$store.state.currentPeriodNum,
          first: 20,
          after: this.allClubMembers.pageInfo.endCursor,
          orderBy: ['member__person__surname', 'member__person__forename'],
          isCurrentMember: this.isCurrentMember,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newMembers = fetchMoreResult.allClubMembers.edges;
          const hasMore = fetchMoreResult.allClubMembers.pageInfo.hasNextPage;
          const pageInfo = fetchMoreResult.allClubMembers.pageInfo;
          const totalCount = fetchMoreResult.allClubMembers.totalCount;

          return {
            cursor: pageInfo.endCursor,
            allClubMembers: {
              __typename: previousResult.allClubMembers.__typename,
              edges: [...previousResult.allClubMembers.edges, ...newMembers],
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
