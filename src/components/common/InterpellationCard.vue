<template>
    <b-card no-body class="mb-1" v-if="interpellation">
        <b-card-body>
            <div class="float-right text-muted">{{ formatDate(interpellation.date) }}</div>
            <h6 class="card-title">{{ interpellation.description }}</h6>
            <p><b-alert :variant="statusVariant(interpellation.status)" show>
                {{ InterpellationStatus[interpellation.status] }}
            </b-alert></p>
        </b-card-body>
    </b-card>
</template>


<script>
import { InterpellationStatus } from '@/graphql/Enums.ts';

export default {
  name: 'InterpellationCard',
  props: {
    interpellation: {type: Object, required: true, default: {}},
  },
  data() {
    return {
      InterpellationStatus,
    };
  },
  methods: {
    statusVariant(resultValue) {
      if (resultValue === 'A_0') {
        return 'secondary';
      } else if (resultValue === 'A_1') {
        return 'primary';
      } else if (resultValue === 'A_2') {
        return 'success';
      } else {
        return 'dark';
      }
    },
  },
};
</script>