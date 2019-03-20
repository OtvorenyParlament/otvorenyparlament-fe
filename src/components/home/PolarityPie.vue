<template>
    <b-card>
        <h6>{{ title }}</h6>
        <div>
            <pie-chart :chart-id="chartId" :chart-data="data" :options="options"></pie-chart>
        </div>
    </b-card>
</template>

<script>
  import PieChart from '@/components/common/PieChart.js';

  export default {
    components: {
      PieChart,
    },
    props: {
      title: String,
      data: {},
      chartId: String,
      options: {
        type: Object,
        default() {
          return {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              position: 'right',
            },
            tooltips: {
              callbacks: {
                label(tooltipItem, data) {
                  const dataset = data.datasets[tooltipItem.datasetIndex];
                  const total = dataset.data.reduce(function passlinterbogusname(previous, current, currentIndex, array) {
                    return previous + current;
                  });
                  const currentValue = dataset.data[tooltipItem.index];
                  const percentage = Math.round(((currentValue / total) * 100) * 100) / 100;
                  return currentValue + ' = ' + percentage + '%';
                },
              },
            },
          };
        },
      },
    },
  };
</script>

