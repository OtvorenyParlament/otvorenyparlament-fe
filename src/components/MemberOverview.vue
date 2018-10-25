<template>
<b-container v-if="member">
    <b-row>
        <b-col>
            <h4>Výkon mandátu</h4>
            <ul>
              <li v-for="node in member.active.edges" :key="node.node.id">
                {{ parseDate(node.node.start) }} - {{ node.node.end ? parseDate(node.node.end) : 'Doteraz' }}
              </li>
            </ul>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'memberOverview',
  props: {
    member: {type: Object, required: true, default: {}},
  },
  data() {
    return {
      currentSessionNumText: String,
      showMoreEnabled: Boolean,
    };
  },
  methods: {
    parseDate(dateString) {
      const dateObj = new Date(Date.parse(dateString));
      return dateObj.toLocaleString('sk-SK', {year: 'numeric', month: 'numeric', day: 'numeric'});
    },
  },
};
</script>