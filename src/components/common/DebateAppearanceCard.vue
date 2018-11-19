<template>
    <b-card no-body class="mb-1" v-if="debateAppearance">
        <b-card-body>
            <div class="float-right text-muted">{{ parseDate(debateAppearance.start) }}</div>
            <h6 class="card-title">{{ debateAppearance.text }}</h6>
        </b-card-body>
    </b-card>
</template>


<script>
export default {
  name: 'DebateAppearanceCard',
  props: {
    debateAppearance: {type: Object, required: true, default: {}},
  },
  methods: {
      parseDate(isoString) {
      const dateObj = new Date(Date.parse(isoString));
      return dateObj.toLocaleString('sk-SK');
    },
  },
};
</script>