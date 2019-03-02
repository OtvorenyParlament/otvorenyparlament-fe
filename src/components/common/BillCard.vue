<template>
    <b-card no-body class="mb-1" v-if="bill">
        <b-card-body>
            <div class="float-right text-muted">{{ formatDate(bill.delivered, 'notime') }}</div>
            <h6 class="card-title">{{ bill.press.title }}</h6>
            <b-alert variant="secondary" show v-if="bill.result">
                Výsledok: {{ BillResult[bill.result] }}
            </b-alert>
        </b-card-body>
    </b-card>
</template>


<script>
import { BillResult } from '@/graphql/Enums.ts';

export default {
  name: 'BillCard',
  props: {
    bill: {type: Object, required: true, default: {}},
  },
  data() {
      return {
          BillResult,
      };
  },
};
</script>
