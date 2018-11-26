<template>
    <b-card>
      <h5>Kreslá podľa klubov</h5>
      <div id="club-chair-chart">
          <apexcharts type="bar" height="260" :options="chartOptions" :series="chartSeries"/>
      </div>
    </b-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'ClubMemberChairChart',
  components: {
    apexcharts: VueApexCharts,
  },
  props: {
    chartSeries: { type: Array, required: true, default: () => [] },
    chartLabels: { type: Array, required: true, default: () => [] },
  },
  data() {
    return {
      chartOptions: {
        tooltip: {
          enabled: false,
        },
        legend: {
            show: false,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '100%',
          }
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: this.chartLabels,
        },
      },
    };
  },
};
</script>