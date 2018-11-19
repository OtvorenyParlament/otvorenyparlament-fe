<template>
    <b-card no-body class="mb-1" v-if="interpellation">
        <b-card-body>
            <div class="float-right text-muted">{{ parseDate(interpellation.date) }}</div>
            <h6 class="card-title">{{ interpellation.description }}</h6>
            <p>{{ interpellation.status }}</p>
            <p>{{ interpellation.externalId }}</p>
        </b-card-body>
    </b-card>
</template>


<script>
export default {
  name: 'InterpellationCard',
  props: {
    interpellation: {type: Object, required: true, default: {}},
  },
  methods: {
      parseDate(isoString) {
      const dateObj = new Date(Date.parse(isoString));
      return dateObj.toLocaleString('sk-SK');
    },
  },
};
</script>