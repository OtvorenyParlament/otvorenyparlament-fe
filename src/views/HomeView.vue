<template>
    <div id="main">
      <div class="padded">
        <b-container>
          <b-row>
            <b-col>
              <b-jumbotron lead="Zbierame dáta z nrsr.sk, ktoré spracúvame a poskytujeme v štruktúrovanej a agregovanej podobe." >
                <router-link :to="{name: 'AboutUsRoute'}"><b-btn variant="primary">Viac info</b-btn></router-link>
              </b-jumbotron>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <!-- <div class="padded">
        <b-container>
          <b-row>
            <b-col cols="8">
               <b-row>
                 <b-col>
                   <h4>Posledných 90 dní</h4>
                 </b-col>
               </b-row>

            </b-col>
            <b-col cols="4">
                <b-row>
                  <b-col>
                    <h4>Najnovšie hlasovanie</h4>
                    <div v-if="allVotings && allVotings.edges">
                      <votingPie :height="200" :pieSeries="allVotings.edges[0].node.chartSeries.series" />
                      <p>{{ formatDate(allVotings.edges[0].node.timestamp) }} - {{ allVotings.edges[0].node.topic }}</p>
                      <p><router-link :to="{ name: 'VotingDetailRoute', params: { id: allVotings.edges[0].node.id }}">Detail hlasovania</router-link></p>
                    </div>
                  </b-col>
                </b-row>
            </b-col>
        </b-row>
        </b-container>
      </div> -->
      <div class="grey padded">
        <b-container>
          <div id="polarity-split">
            <h3>Parlament podľa pólov</h3>
            <b-row>
              <b-col cols="12" sm="6" lg="3">
                <polarityChart title="Návrhy zákonov" :height="110" :chartSeries="polarityBillSeries" :chartLabels="[polarityNameCoalition, polarityNameOpposition, polarityNameGovernment, polarityNameCommittee]"/>
              </b-col>
              <b-col cols="12" sm="6" lg="3">
                <polarityChart title="Pozme/dopl-ňujúce návrhy" :height="110" :chartSeries="polarityAmendmentSeries" :chartLabels="[polarityNameCoalition, polarityNameOpposition]"/>
              </b-col>
              <b-col cols="12" sm="6" lg="3">
                <polarityChart title="Interpelácie" :height="110" :chartSeries="polarityInterpellationSeries" :chartLabels="[polarityNameCoalition, polarityNameOpposition]"/>
              </b-col>
              <b-col cols="12" sm="6" lg="3">
                <polarityChart title="Kreslá" :height="110" :chartSeries="polarityChartSeries" :chartLabels="[polarityNameCoalition, polarityNameOpposition]"/>
              </b-col>
            </b-row>
          </div>
        </b-container>
      </div>
      <div class="padded">
        <b-container>
          <div id="club-split" v-if="seatChartSeries && seatChartSeries.length > 0">
            <h3>Parlament podľa klubov</h3>
            <b-row>
              <b-col cols="12" sm="12" md="6">
                <clubChart title="Návrhy zákonov" :chartSeries="seatBillSeries" :chartLabels="seatChartLabels" />
              </b-col>
              <b-col cols="12" sm="12" md="6">
                <clubChart title="Pozmeňujúce / doplňujúce návrhy" :chartSeries="seatAmendmentSeries" :chartLabels="seatChartLabels" />
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" sm="12" md="6">
                <clubChart title="Interpelácie" :chartSeries="seatInterpellationSeries" :chartLabels="seatChartLabels" />
              </b-col>
              <b-col cols="12" sm="12" md="6">
                <clubChart title="Kreslá" :chartSeries="seatChartSeries" :chartLabels="seatChartLabels" />
              </b-col>
            </b-row>
          </div>
        </b-container>
      </div>
      <!-- <div class="grey padded">
        <b-container>
          <div id="member-activity-split">
             <h3>Aktivity poslancov</h3>
          <b-row>
            <b-col>
              <b-card>
                <h5>Najaktívnejší poslanci</h5>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <h5>Najmenej aktívni poslanci</h5>
              </b-card>
            </b-col>
          </b-row>
          </div>
        </b-container>
      </div> -->
    </div>
</template>

<script>
import gql from 'graphql-tag';
import ClubListMixin from '@/mixins/ClubListMixin.js';


export default {
  name: 'HomeView',
  components: {
    clubChart: () => import('@/components/club/ClubChart.vue'),
    polarityChart: () => import('@/components/common/PolarityChart.vue'),
    votingPie: () => import('@/components/voting/VotingPie.vue'),
  },
  mixins: [ClubListMixin],
  data() {
    return {
      polarityBillSeries: [],
      polarityAmendmentSeries: [],
      polarityInterpellationSeries: [],
      seatBillSeries: [],
      seatAmendmentSeries: [],
      seatInterpellationSeries: [],
      seatChartLabels: [],
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
        this.polarityBillSeries = [
          result.data.globalStats.billCountByCoalition,
          result.data.globalStats.billCountByOpposition,
          result.data.globalStats.billCountByGovernment,
          result.data.globalStats.billCountByCommittee,
        ];
        this.polarityAmendmentSeries = [
          result.data.globalStats.amendmentCountByCoalition,
          result.data.globalStats.amendmentCountByOpposition,
        ];
        this.polarityInterpellationSeries = [
          result.data.globalStats.interpellationCountByCoalition,
          result.data.globalStats.interpellationCountByOpposition,
        ];
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
        let billSeries = new Array(result.data.globalClubStats.edges.length);
        let amendmentSeries = new Array(result.data.globalClubStats.edges.length);
        let interpellationSeries = new Array(result.data.globalClubStats.edges.length);

        for (const entry of result.data.globalClubStats.edges) {
          const label = this.seatChartLabels.indexOf(entry.node.club.name);
          billSeries[label] = {name: entry.node.club.name, data: [entry.node.billCount]};
          amendmentSeries[label] = {name: entry.node.club.name, data: [entry.node.amendmentCount]};
          interpellationSeries[label] = {name: entry.node.club.name, data: [entry.node.interpellationCount]};
        }
        this.seatBillSeries = billSeries;
        this.seatAmendmentSeries = amendmentSeries;
        this.seatInterpellationSeries = interpellationSeries;

        billSeries = [];
        amendmentSeries = [];
        interpellationSeries = [];
      },
    },
  },
  watch: {
    seatChartLabels: {
      handler(newVal) {
        if (newVal && this.seatChartLabels) {
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

// .polarity-split .col {
//   margin-bottom: 5px;
// }

.padded {
  padding-top: 1.5em;
  padding-bottom: 1.5em;
}
</style>

<style lang="scss">
#polarity-split .card, #club-split .card {
  margin-bottom: 5px;
}

</style>
