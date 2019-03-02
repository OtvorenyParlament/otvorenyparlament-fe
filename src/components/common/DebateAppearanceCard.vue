<template>
    <b-card no-body class="mb-1" v-if="debateAppearance">
        <b-card-body>
            <div class="float-right text-muted">{{ formatDate(debateAppearance.start) }}</div>
            <h6 class="card-title"><span style="white-space: pre-wrap; word-wrap: break-word;">{{ debateAppearance.text }}</span></h6>
        </b-card-body>
    </b-card>
</template>


<script>
export default {
  name: 'DebateAppearanceCard',
  props: {
    debateAppearance: {type: Object, required: true, default: {}},
  },
};
</script>