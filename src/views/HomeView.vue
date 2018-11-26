<template>
    <b-container id="main">
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
                      
                      <votingPie height="200" :pieSeries="allVotings.edges[0].node.chartSeries.series" :pieLabels="allVotings.edges[0].node.chartSeries.labels" />
                      <p>{{ formatDate(allVotings.edges[0].node.timestamp) }} - {{ allVotings.edges[0].node.topic }}</p>
                      <p><router-link :to="{ name: 'VotingDetailRoute', params: { id: allVotings.edges[0].node.id }}">Detail hlasovania</router-link></p>
                    </div>
                  </b-col>
                </b-row>
            </b-col>
        </b-row>
        <hr>
        <div v-if="allClubs && allClubs.edges && polarityChartSeries">
          <h3>Parlament podľa pólov</h3>
          <b-row>
            <b-col>
            </b-col>
            <b-col>
            </b-col>
            <b-col>
              <clubMemberPolarityChart :chartSeries="polarityChartSeries" :chartLabels="[polarityNameCoalition, polarityNameOpposition]"/>
            </b-col>
          </b-row>
          <hr>
          <h3>Parlament podľa klubov</h3>
          <b-row>
            <b-col>
            </b-col>
            <b-col>
            </b-col>
            <b-col>
              <clubMemberChairChart :chartSeries="chairChartSeries" :chartLabels="chairChartLabels"/>
            </b-col>
          </b-row>
        </div>
    </b-container>
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
