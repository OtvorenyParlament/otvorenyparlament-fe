import { Pie, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: {
    options: Object,
    chartData: {},
  },
  name: 'pie-chart',
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
};

