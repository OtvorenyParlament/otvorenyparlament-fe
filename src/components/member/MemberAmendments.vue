<template>
    <b-container v-if="allAmendments && allAmendments.edges" class="py-2">
      <b-row>
        <b-col>Počet nájdených návrhov: <b-badge>{{ allAmendments.totalCount }}</b-badge></b-col>
      </b-row>
      <b-row v-for="amendment in allAmendments.edges" :key="amendment.node.id">
        <div class="col py-2">
            <b-card>
                <div class="float-right text-muted">{{ parseDate(amendment.date) }}</div>
                
            </b-card>
        </div>
      </b-row>
    </b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'memberAmendments',
  props: {
    memberId: {type: String, required: false, default: {}},
  },
  data() {
    return {
      showMoreEnabled: false,
    };
  },
  apollo: {
    allAmendments: {
      query: gql`
        query allAmendments($submitter: ID!, $first: Int!, $after: String) {
          allAmendments(submitter: $submitter, first: $first, after: $after) {
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
                submitter {
                  id
                  person {
                    id
                  }
                }
                title
                date
                voting {
                  votingNum
                }
                amendmentsubmitterSet {
                  edges {
                    node {
                      id
                    }
                  }
                }
                amendmentsignedmemberSet {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          submitter: this.memberId,
          first: 20,
          orderBy: ['-date'],
        };
      },
    },
  },
};
</script>

<style>
</style>