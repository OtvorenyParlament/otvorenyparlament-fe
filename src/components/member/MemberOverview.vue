<template>
<b-container v-if="member">
    <b-row>
        <b-col>
            <h5>Výkon mandátu</h5>
            <ul>
              <li v-for="node in member.active.edges" :key="node.node.id">
                {{ formatDate(node.node.start, "notime") }} - {{ node.node.end ? formatDate(node.node.end, "notime") : 'Doteraz' }}
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
    <b-row v-if="memberStats">
      <b-col>
        <h5>Aktivity</h5>
        <ul>
          <li>Návrhy zákonov: {{ memberStats.billCount }}</li>
          <li>Pozmeňujúce / doplňujúce návrhy: {{ memberStats.amendmentCount }}</li>
          <li>Interpelácie: {{ memberStats.interpellationCount }}</li>
          <!-- <li>Vystúpenia v rozprave: {{ memberStats.debateCount }}</li> -->
        </ul>
      </b-col>
      <b-col>
        <h5>Výbory</h5>
        <p v-for="(committee, index) in member.committeeMemberships.edges" :key="index">{{ committee.node.committee.name }}</p>
        <b-alert show>Členstvo v delegáciách pripravujeme</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col><router-link :to="{name: 'ContactRoute'}">Upozornite nás na chybu</router-link></b-col>
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
  apollo: {
    memberStats: {
      query: gql`
        query memberStats($member: ID!) {
          memberStats(member: $member) {
            billCount
            amendmentCount
            interpellationCount
            debateCount
          }
        }
      `,
      variables() {
        return {
          member: this.member.id,
        };
      },
    },
  },
};
</script>