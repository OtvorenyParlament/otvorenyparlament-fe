<template>
<b-container v-if="member">
    <b-row>
        <b-col>
            <h5>Výkon mandátu</h5>
            <ul>
              <li v-for="node in member.active.edges" :key="node.node.id">
                {{ parseDate(node.node.start) }} - {{ node.node.end ? parseDate(node.node.end) : 'Doteraz' }}
              </li>
            </ul>
        </b-col>
        <b-col>
          <h5>Klub</h5>
          <p>{{ member.clubMemberships.edges[0].node.club.name }}</p>
          <h5>Kandidoval(a) za stranu</h5>
          <p>{{ member.stoodForParty.name }}</p>
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
    currentPeriodNum: {type: Number, required: true, default: 0},
    defaultPeriodNum: {type: Number, required: true, default: -1},
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