import VueApexCharts from 'vue-apexcharts';
import { AllClubsQuery } from '@/graphql/AllClubsQuery.gql';

export default {
  components: {
    apexcharts: VueApexCharts,
  },
  data: function () {
    return {
      polarityChartSeries: [],
      polarityNameCoalition: 'Koalícia',
      polarityNameOpposition: 'Opozícia',
      chairChartSeries: [],
      chairChartLabels: [],
    }
  },
  apollo: {
    allClubs: {
      query: AllClubsQuery,
      variables() {
        return {
          periodNum: this.$store.state.currentPeriodNum,
        };
      },
      result(result) {
        if (result.stale === false) {
          let polarityCoalition = 0;
          let polarityOpposition = 0;
          let chairChartSeries = [];
          let chairChartLabels = [];
          let polarityChartSeries = [];
          var orderedClubs = result.data.allClubs.edges.sort(
            (a, b) =>
              a.node.currentMemberCount < b.node.currentMemberCount ? 1 : a.node.currentMemberCount > b.node.currentMemberCount ? -1 : 0);
          for (let i of orderedClubs) {
            i.node.coalition ? polarityCoalition += i.node.currentMemberCount : polarityOpposition += i.node.currentMemberCount;
            chairChartSeries.push({
              data: [i.node.currentMemberCount],
              name: i.node.name,
            });
            chairChartLabels.push(i.node.name);
          }

          polarityChartSeries = [
            { name: this.polarityNameCoalition, data: [polarityCoalition] },
            { name: this.polarityNameOpposition, data: [polarityOpposition] }
          ];

          this.chairChartLabels = chairChartLabels;
          this.chairChartSeries = chairChartSeries;
          this.polarityChartSeries = polarityChartSeries;
        }
      },
    },
  },
};
