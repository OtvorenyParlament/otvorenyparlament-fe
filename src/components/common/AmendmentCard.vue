<template>
    <b-card no-body class="mb-1" v-if="amendment">
        <b-card-body>
            <div class="float-right text-muted">{{ parseDate(amendment.date) }}</div>
            <h6 class="card-title">{{ amendment.press.title }}</h6>
        </b-card-body>
    </b-card>
</template>


<script>
export default {
  name: 'AmendmentCard',
  props: {
    amendment: {type: Object, required: true, default: {}},
  },
  methods: {
      parseDate(isoString) {
      const dateObj = new Date(Date.parse(isoString));
      return dateObj.toLocaleString('sk-SK');
    },
  },
};
</script>