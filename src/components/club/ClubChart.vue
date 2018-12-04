<template>
    <b-card v-if="chartSeries.length > 0 && chartLabels.length > 0">
      <h6>{{ title }}</h6>
      <div>
          <apexcharts type="bar" :height="height" :options="chartOptions" :series="chartSeries"/>
      </div>
    </b-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'ClubChart',
  components: {
    apexcharts: VueApexCharts,
  },
  props: {
    chartSeries: { type: Array, required: true, default: () => [] },
    chartLabels: { type: Array, required: true, default: () => [] },
    height: {type: Number, required: false, default: 260},
    title: {type: String, required: true},
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
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: this.chartLabels,
        },
      },
    };
  },
};
</script>