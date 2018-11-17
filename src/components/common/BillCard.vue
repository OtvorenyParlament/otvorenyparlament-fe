<template>
    <b-card no-body class="mb-1" v-if="bill">
        <b-card-body>
            <div class="float-right text-muted">{{ parseDate(bill.delivered) }}</div>
            <h6 class="card-title">{{ bill.press.title }}</h6>
            <p>
                {{ bill.result }}
            </p>
        </b-card-body>
    </b-card>
</template>


<script>
export default {
  name: 'BillCard',
  props: {
    bill: {type: Object, required: true, default: {}},
  },
  methods: {
      parseDate(isoString) {
      const dateObj = new Date(Date.parse(isoString));
      return dateObj.toLocaleString('sk-SK');
    },
  },
};
</script>