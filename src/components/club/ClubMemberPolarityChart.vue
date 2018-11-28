<template>
    <b-card v-if="chartSeries && chartSeries.length > 0">
        <h5>Kreslá podľa pólov</h5>
        <div id="coalition-polarity-chart">
            <apexcharts type="pie" :height="height" :options="chartOptions" :series="chartSeries" />
        </div>
    </b-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'ClubMemberPolarityChart',
  components: {
    apexcharts: VueApexCharts,
  },
  props: {
    chartSeries: { type: Array, required: true, default: () => [] },
    chartLabels: { type: Array, required: true, default: () => [] },
    height: {type: Number, required: false, default: 180},
  },
  data() {
    return {
      chartOptions: {
        labels: this.chartLabels,
        // tooltip: {
        //   enabled: false,
        // },
        // legend: {
        //     show: false,
        // },
        // plotOptions: {
        //   bar: {
        //     horizontal: false,
        //     barHeight: '100%',
        //   },
        // },
        // dataLabels: {
        //   enabled: true,
        // },
        // xaxis: {
        //   categories: this.chartLabels,
        // },
      },
    };
  },
};
</script>
