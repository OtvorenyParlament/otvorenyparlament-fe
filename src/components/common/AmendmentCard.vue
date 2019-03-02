<template>
    <b-card no-body class="mb-1" v-if="amendment">
        <b-card-body>
            <div class="float-right text-muted">{{ formatDate(amendment.date, 'notime') }}</div>
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
};
</script>