<template>
    <div id="main">
      <div class="padded">
        <b-container>
          <b-row>
            <b-col>
              <b-jumbotron lead="Zbierame dáta z nrsr.sk, ktoré spracúvame a poskytujeme v štruktúrovanej a agregovanej podobe. Sme v pilotnej prevádzke, preto uvítame akúkoľvek spätnú väzbu.">
                <router-link :to="{name: 'AboutUsRoute'}"><b-btn variant="primary">Dozvedieť sa viac</b-btn></router-link>
              </b-jumbotron>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div class="grey padded">
        <b-container>
          <div id="polarity-split">
            <h3>Parlament podľa pólov</h3>
            <b-row>
              <b-col cols="12" md="6">
                <polarity-pie title="Návrhy zákonov" :data="polarityBillSeries"></polarity-pie>
              </b-col>
              <b-col cols="12" md="6">
                <p>Návrhy zákonov môže predkladať vláda, ktorú zostavili členovia koalície. Ďalej to môžu byť výbory, ktoré sú tvorené poslancami parlamentu. Návrhy môžu predkladať aj poslanci samostatne alebo skupinovo.</p>
                <p>Zjednodušene je tak možné pokladať aj koaličné návrhy aj návrhy vlády za spoločnú činnosť koalície. Návrhy výborov bývajú činnosťou členov, ktorí môžu byť ako koaliční, tak opoziční.</p>
              </b-col>
            </b-row>
            <hr>
            <b-row>
              <b-col cols="12" md="6">
                <polarity-pie title="Pozmeňujúce návrhy" :data="polarityAmendmentSeries"></polarity-pie>
              </b-col>
              <b-col cols="12" md="6">
                <p>Doplňujúce a pozmeňujúce návrhy môžu podávať poslanci v druhom respektíve treťom čítaní, ak na to získajú súhlas potrebného množstva poslancov. Viac informácií o tomto procese nájdete <a href="https://www.nrsr.sk/web/default.aspx?SectionId=3" target="_blank">tu</a>, v časti Zákonodarná pôsobnosť.</p> 
              </b-col>
            </b-row>
            <hr>
            <b-row>
              <b-col cols="12" md="6">
                <polarity-pie title="Interpelácie" :data="polarityInterpellationSeries"></polarity-pie>
              </b-col>
              <b-col cols="12" md="6">
                <p>Interpelácie sú kontrolným nástrojom členov parlamentu (poslancov) voči členom vlády. Prostredníctvom interpelácií sa členov vlády pýtajú, pripomienkujú a členovia vlády sú povinní odpovedať.</p>
              </b-col>
            </b-row>
            <hr>
            <b-row>
              <b-col cols="12" md="6">
                <polarity-pie title="Kreslá" :data="polaritySeatSeries"></polarity-pie>
              </b-col>
            </b-row>
          </div>
        </b-container>
      </div>
      <div class="padded">
        <b-container>
          <div id="club-split" :v-if="seatSeries && seatSeries.length > 0">
            <h3>Parlament podľa klubov</h3>
            <b-row>
              <b-col cols="12" md="6">
                <seat-bar title="Návrhy zákonov" :data="seatBillSeries"></seat-bar>
              </b-col>
              <b-col cols="12" md="6">
                <seat-bar title="Pozmeňujúce / doplňujúce návrhy" :data="seatAmendmentSeries"></seat-bar>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" md="6">
                <seat-bar title="Interpelácie" :data="seatInterpellationSeries"></seat-bar>
              </b-col>
              <b-col cols="12" md="6">
                <seat-bar title="Kreslá" :data="seatSeries"></seat-bar>
              </b-col>
            </b-row>
          </div>
        </b-container>
      </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import ClubListMixin from '@/mixins/ClubListMixin.js';

export default {
  name: 'HomeView',
  components: {
    polarityPie: () => import('@/components/home/PolarityPie.vue'),
    seatBar: () => import('@/components/home/SeatBar.vue'),
  },
  mixins: [ClubListMixin],
  data() {
    return {
      polarityBillSeries: {},
      polarityAmendmentSeries: {},
      polarityInterpellationSeries: {},
      seatBillSeries: {},
      seatAmendmentSeries: {},
      seatInterpellationSeries: {},
      seatSeries: {},
    };
  },
  apollo: {
    allVotings: {
      query: gql`query allVotings($first:Int!, $orderBy:[String]) {
        allVotings(first:$first, orderBy:$orderBy) {
          edges {
            node {
              id
              timestamp
              topic
              result
              chartSeries {
                series
                labels
              }
              press {
                title
                id
              }
            }
          }
        }
      }`,
      variables() {
        return {
          first: 1,
          orderBy: ['-timestamp'],
        };
      },
    },
    globalStats: {
      query: gql`query globalStats($periodNum: Int!) {
        globalStats(periodNum: $periodNum) {
          billCountByCoalition
          billCountByOpposition
          billCountByGovernment
          billCountByCommittee
          amendmentCountByCoalition
          amendmentCountByOpposition
          interpellationCountByCoalition
          interpellationCountByOpposition
        }
      }`,
      variables() {
        return {
          periodNum: (this.$store.state.currentPeriodNum || process.env.VUE_APP_DEFAULT_PERIOD),
        };
      },
      result(result) {
        this.polarityBillSeries = {
          labels: [this.polarityNameCoalition, this.polarityNameOpposition,
                   this.polarityNameGovernment, this.polarityNameCommittee],
          datasets: [
            {
              backgroundColor: this.backgroundColorPalette.slice(0, 4),
              data: [
                result.data.globalStats.billCountByCoalition,
                result.data.globalStats.billCountByOpposition,
                result.data.globalStats.billCountByGovernment,
                result.data.globalStats.billCountByCommittee,
              ],
            },
          ],
        };
        this.polarityAmendmentSeries = {
          labels: [this.polarityNameCoalition, this.polarityNameOpposition],
          datasets: [
            {
              backgroundColor: this.backgroundColorPalette.slice(0, 2),
              data: [
                result.data.globalStats.amendmentCountByCoalition,
                result.data.globalStats.amendmentCountByOpposition,
              ],
            },
          ],
        };
        this.polarityInterpellationSeries = {
          labels: [this.polarityNameCoalition, this.polarityNameOpposition],
          datasets: [
            {
              backgroundColor: this.backgroundColorPalette.slice(0, 2),
              data: [
                result.data.globalStats.interpellationCountByCoalition,
              result.data.globalStats.interpellationCountByOpposition,
              ],
            },
          ],
        };
      },
    },
    globalClubStats: {
      query: gql`query globalClubStats($periodNum: Int!) {
        globalClubStats(periodNum: $periodNum) {
          edges {
            node {
              billCount
              amendmentCount
              interpellationCount
              club {
                name
              }
            }
          }
        }
      }`,
      skip: true,
      variables() {
        return {
          periodNum: (this.$store.state.currentPeriodNum || process.env.VUE_APP_DEFAULT_PERIOD),
        };
      },
      result(result) {
        const billSeries = {labels: [], datasets: [{
          backgroundColor: this.backgroundColorPalette.slice(0, result.data.globalClubStats.edges.length),
          data: [],
        }]};
        const amendmentSeries = {labels: [], datasets: [{
          backgroundColor: this.backgroundColorPalette.slice(0, result.data.globalClubStats.edges.length),
          data: [],
        }]};
        const interpellationSeries = {labels: [], datasets: [{
          backgroundColor: this.backgroundColorPalette.slice(0, result.data.globalClubStats.edges.length),
          data: [],
        }]};
        for (const entry of result.data.globalClubStats.edges) {
          const label = this.seatSeries.labels.indexOf(entry.node.club.name);
          billSeries.datasets[0].data[label] = entry.node.billCount;
          amendmentSeries.datasets[0].data[label] = entry.node.amendmentCount;
          interpellationSeries.datasets[0].data[label] = entry.node.interpellationCount;
        }
        billSeries.labels = this.seatSeries.labels;
        amendmentSeries.labels = this.seatSeries.labels;
        interpellationSeries.labels = this.seatSeries.labels;
        this.seatBillSeries = billSeries;
        this.seatAmendmentSeries = amendmentSeries;
        this.seatInterpellationSeries = interpellationSeries;
      },
    },
  },
  watch: {
    seatSeries: {
      handler(newVal) {
        if (newVal && this.seatSeries) {
          this.$apollo.queries.globalClubStats.skip = false;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.grey {
  background-color: #f8f9fa;
}

.padded {
  padding-top: 1.5em;
  padding-bottom: 1.5em;
}
</style>

<style lang="scss">
#polarity-split .card, #club-split .card {
  margin-bottom: 5px;
}

#polarity-split canvas {
  height: 180px !important;
}

#club-split canvas {
  height: 240px !important;
}

</style>

