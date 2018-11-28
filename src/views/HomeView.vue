<template>
    <div id="main">
      <div class="padded">
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
                      <votingPie height="200" :pieSeries="allVotings.edges[0].node.chartSeries.series" />
                      <p>{{ formatDate(allVotings.edges[0].node.timestamp) }} - {{ allVotings.edges[0].node.topic }}</p>
                      <p><router-link :to="{ name: 'VotingDetailRoute', params: { id: allVotings.edges[0].node.id }}">Detail hlasovania</router-link></p>
                    </div>
                  </b-col>
                </b-row>
            </b-col>
        </b-row>
        </b-container>
      </div>
      <div class="grey padded">
        <b-container>
          <div id="polarity-slit" v-if="polarityChartSeries">
            <h3>Parlament podľa pólov</h3>
            <b-row>
              <b-col>
                <b-card>
                  <h5>Návrhy zákonov podľa pólov</h5>

                </b-card>
              </b-col>
              <b-col>
                <b-card>
                  <h5>Pozmeňujúce / doplňujúce návrhy podľa pólov</h5>
                  
                </b-card>
              </b-col>
              <b-col>
                <b-card>
                  <h5>Interpelácie podľa pólov</h5>
                </b-card>
              </b-col>
              <b-col>
                <clubMemberPolarityChart :height="110" :chartSeries="polarityChartSeries" :chartLabels="[polarityNameCoalition, polarityNameOpposition]"/>
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
              <b-col>
                <b-card>
                  <h5>Návrhy zákonov podľa klubov</h5>

                </b-card>
              </b-col>
              <b-col>
                <b-card>
                  <h5>Pozmeňujúce / doplňujúce návrhy podľa klubov</h5>
                  
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-card>
                  <h5>Interpelácie podľa klubov</h5>
                </b-card>
              </b-col>
              <b-col>
                <clubMemberSeatChart :chartSeries="seatChartSeries" :chartLabels="seatChartLabels" />
              </b-col>
            </b-row>
          </div>
        </b-container>
      </div>
      <div class="grey padded">
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
      </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import ClubListMixin from '@/mixins/ClubListMixin.js';


export default {
  name: 'HomeView',
  mixins: [ClubListMixin],
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

