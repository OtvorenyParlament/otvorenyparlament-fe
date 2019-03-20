<template>
    <b-container v-if="voting">
        <h1>{{ voting.topic }}</h1>
        <b-row>
          <b-col cols="6">
            <ul>
              <li><b-badge :variant="resultVariant(voting.result)">{{ VotingResult[voting.result] }}</b-badge></li>
              <li>{{ formatDate(voting.timestamp) }}</li>
              <li>Číslo schôdze: {{ voting.session.sessionNum }}</li>
              <li>Číslo hlasovania: {{ voting.votingNum }}</li>
              <li v-if="voting.press">Číslo tlače: {{ voting.press.pressNum }}</li>
              <li><a :href="voting.url" target="_blank">Otvoriť na NRSR.sk</a></li>
            </ul>
          </b-col>
          <b-col cols="6">
            <div id="voting-detail-pie">
              <voting-pie :data="votingSeries"></voting-pie>
            </div>
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
import ChartPaletteMixin from '@/mixins/ChartPaletteMixin.js';

export default {
  name: 'VotingDetailView',
  mixins: [ChartPaletteMixin],
  components: {
    votingPie: () => import('@/components/voting/VotingPie.vue'),
  },
  data() {
    return {
      VotingResult,
      votingSeries: {},
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
      result(result) {
        const labels = result.data.voting.chartSeries.labels;
        const data = result.data.voting.chartSeries.series;
        this.votingSeries = {
          labels,
          datasets: [{
            backgroundColor: this.backgroundColorPalette.slice(0, labels.length),
            data,
          }],
        };
      },
    },
  },
};
</script>

<style scoped>
ul {
  padding-left: 0;
}
ul li {
  list-style-type: none;
}
</style>
<style>
#voting-detail-pie canvas {
  height: 240px ! important;
}
</style>
