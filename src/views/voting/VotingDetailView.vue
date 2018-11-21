<template>
    <b-container v-if="voting">
        <h1>{{ voting.topic }}</h1>
        <b-badge variant="info">Hlasovanie</b-badge>
        <b-row>
            <b-col>{{ formatDate(voting.timestamp) }}</b-col>
            <b-col>{{ voting.session }}</b-col>
            <b-col>{{ voting.press }}</b-col>
            <b-col>{{ VotingResult[voting.result] }}</b-col>
        </b-row>
    </b-container>
</template>

<script>
import { VotingQuery } from '@/graphql/VotingQuery.gql';
import { VotingResult } from '@/graphql/Enums.ts';

export default {
  name: 'VotingDetailView',
  data() {
      return {
          VotingResult: VotingResult,
      };
  },
  apollo: {
    voting: {
      query: VotingQuery,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },
};
</script>
