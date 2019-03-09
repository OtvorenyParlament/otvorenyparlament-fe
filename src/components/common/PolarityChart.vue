<template>
    <b-card v-if="chartSeries && chartSeries.length > 0">
        <h6>{{ title }}</h6>
        <div>
            <apexcharts height="180" type="pie" :options="chartOptions" :series="chartSeries" />
        </div>
    </b-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'PolarityChart',
  components: {
    apexcharts: VueApexCharts,
  },
  props: {
    chartSeries: { type: Array, required: true, default: () => [] },
    chartLabels: { type: Array, required: true, default: () => [] },
    height: {type: Number, required: false, default: 180},
    title: {type: String, required: true},
  },
  data() {
    return {
      chartOptions: {
        labels: this.chartLabels,
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
<style>
.apexchartscanvas {
  min-height: 180px;
  max-height: 250px;
}
</style>
