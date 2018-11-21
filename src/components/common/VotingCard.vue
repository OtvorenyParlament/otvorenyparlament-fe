<template>
    <b-card no-body class="mb-1" v-if="voting">
        <b-card-body variant="success">
            <div class="float-right text-muted">{{ formatDate(voting.timestamp) }}</div>
            <p class="card-text">{{ voting.topic }}</p>
            <b-alert :variant="resultVariant(voting.result)" show>
                {{ VotingResult[voting.result] }}
            </b-alert>
        </b-card-body>
    </b-card>
</template>


<script>
import { VotingResult } from '@/graphql/Enums.ts';

export default {
  name: 'votingCard',
  props: {
    voting: {type: Object, required: true, default: {}},
  },
  data() {
    return {
      VotingResult: VotingResult,
    };
  },
  methods: {
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
