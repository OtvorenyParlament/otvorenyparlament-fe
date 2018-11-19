<template>
    <b-container id="main">
        <b-row>
            <b-col cols="8">
                <!-- <b-row>
                    <b-col v-if="allVotings && allVotings.edges">
                        <h4>Najnovšie hlasovania</h4>
                        <p>{{ allVotings.edges[0].node.topic }}</p>
                        <apexcharts width="450" height="350" type="pie" :options="{'labels': allVotings.edges[0].node.chartSeries.labels}" :series="allVotings.edges[0].node.chartSeries.series"></apexcharts>
                        <b-button variant="success" :to="{ name: 'votingdetail', params: { id: allVotings.edges[0].node.id }}">Detail hlasovania</b-button>
                    </b-col>
                </b-row> -->

            </b-col>
            <b-col>
                <b-row>
                    <b-col>
                        B
                    </b-col>
                    <b-col>
                        C
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  // components: {
  //   apexcharts: VueApexCharts,
  // },
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
