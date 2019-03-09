<template>
    <b-container>
        <b-row>
            <b-col>
                <apexcharts type="pie" :options="chartOptions" :series="pieSeries"></apexcharts>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'VotingPie',
  components: {
    apexcharts: VueApexCharts,
  },
  props: {
    pieSeries: { type: Array, required: true, default: () => [] },
    pieLabels: {
      type: Array,
      required: false,
      default: () => ['Za', 'Proti', 'Zdržal(a) sa', 'Nehlasoval(a)', 'Neprítomná/ý'],
    },
    height: {type: Number, required: false, default: 350},
  },
  data() {
    return {
      chartOptions: {
        labels: this.pieLabels,
        legend: {
          position: 'right',
        },
        chart: {
          height: 80,
        },
        responsive: [
          {
            breakpoint: 359,
            options: {
              legend: {
                position: 'bottom',
              },
              chart: {
                height: 250,
              },
            },
          }
        ]
      }
    }
  }
};
</script>
