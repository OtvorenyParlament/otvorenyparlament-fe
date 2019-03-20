import { AllClubsQuery } from '@/graphql/AllClubsQuery.gql';
import ChartPaletteMixin from '@/mixins/ChartPaletteMixin.js';
export default {
  mixins: [ChartPaletteMixin],
  data: function () {
    return {
      polaritySeatSeries: {},
      polarityNameCoalition: 'Koaliční poslanci',
      polarityNameOpposition: 'Opoziční poslanci',
      polarityNameGovernment: 'Vláda',
      polarityNameCommittee: 'Výbory',
      seatSeries: {},
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
          let seatSeries = {
            labels: [],
            datasets: [{
              backgroundColor: this.backgroundColorPalette.slice(0, result.data.allClubs.edges.length),
              data: []
          }]};
          var orderedClubs = result.data.allClubs.edges.sort(
            (a, b) =>
              a.node.currentMemberCount < b.node.currentMemberCount ? 1 : a.node.currentMemberCount > b.node.currentMemberCount ? -1 : 0);
          for (let i of orderedClubs) {
            i.node.coalition ? polarityCoalition += i.node.currentMemberCount : polarityOpposition += i.node.currentMemberCount;
            seatSeries.labels.push(i.node.name);
            seatSeries.datasets[0].data.push(i.node.currentMemberCount);
          }
          this.seatSeries = seatSeries;
          this.polaritySeatSeries = {
            labels: [this.polarityNameCoalition, this.polarityNameOpposition],
            datasets: [
              {
                backgroundColor: this.backgroundColorPalette.slice(0, 2),
                data: [
                  polarityCoalition,
                  polarityOpposition
                ]
              }
            ]
          }
        }
      },
    },
  },
};

