<template>
    <b-container>
        <b-row>
            <b-col>
                <apexcharts width="450" height="350" type="pie" :options="{'labels': pieLabels}" :series="pieSeries"></apexcharts>
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
  },
};
</script>
