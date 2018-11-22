<template>
    <b-container v-if="voting">
        <h1>{{ voting.topic }}</h1>
        <b-badge :variant="resultVariant(voting.result)">{{ VotingResult[voting.result] }}</b-badge>
        <b-row>
            <b-col>{{ formatDate(voting.timestamp) }}</b-col>
            <b-col>Číslo schôdze: {{ voting.session.sessionNum }}</b-col>
            <b-col>Číslo hlasovania: {{ voting.votingNum }}</b-col>
            <b-col><div v-if="voting.press">Číslo tlače: {{ voting.press.pressNum }}</div></b-col>
            <b-col><a :href="voting.url" target="_blank">Otvoriť na NRSR.sk</a></b-col>
        </b-row>
        <b-row>
          <b-col>
            <votingPie :pieLabels="voting.chartSeries.labels" :pieSeries="voting.chartSeries.series"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-alert variant="secondary" show>V tomto zobrazení pripravujeme super-trooper funkcionalitu. Navštívte nás čoskoro</b-alert>
          </b-col>
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
  methods: {
    resultVariant(resultValue) {
      if (resultValue === 'A_0') {
        return 'success';
      } else if (resultValue === 'A_1') {
        return 'danger';
      } else if (resultValue === 'A_2') {
        return 'warning';
      } else {
        return 'dark';
      }
    },
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
