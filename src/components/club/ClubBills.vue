<template>
    <b-container>
      <p v-if="allBills">{{ allBills }}</p>
    </b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'ClubBills',
  props: {
    clubId: { type: String, required: true, default: '' },
  },
  apollo: {
    allBills: {
      query: gql`query allBills($clubId: ID, $first:Int!, $after: String, $orderBy: [String]) {
        allBills(proposers_Person_Memberships_ClubMemberships_Club:$clubId, first:$first, after:$after, orderBy:$orderBy) {
          edges {
            node {
              id
              state
              result
              proposerNonmember
              proposers {
                edges {
                  node {
                    person {
                      forename
                      surname
                    }
                  }
                }
              }
            }
          }
        }
      }`,
      variables() {
        return {
          clubId: this.clubId,
          first: 20,
          orderBy: ['delivered'],
        }
      },
      skip: true,
    }
  },
}
</script>

<style>

</style>
