<template>
    <b-card no-body class="mb-1" v-if="voting">
        <b-card-body variant="success">
            <div class="float-right text-muted">{{ parseDate(voting.timestamp) }}</div>
            <p class="card-text">{{ voting.topic }}</p>
            <b-alert :variant="resultVariant(voting.result)" show>
                {{ voting.resultDisplay }}
            </b-alert>
        </b-card-body>
    </b-card>
</template>


<script>
export default {
  name: 'votingCard',
  props: {
    voting: {type: Object, required: true, default: {}},
  },
  methods: {
      parseDate(isoString) {
      const dateObj = new Date(Date.parse(isoString));
      return dateObj.toLocaleString('sk-SK');
    },
    resultVariant(resultValue) {
      if (resultValue === 'A_0') {
        return 'success';
      } else if (resultValue === 'A_1') {
        return 'danger';
      } else if (resultValue === 'A_2') {
        return 'warning';
      } else {
        return 'dark';
      }
    },
  },
};
</script>
