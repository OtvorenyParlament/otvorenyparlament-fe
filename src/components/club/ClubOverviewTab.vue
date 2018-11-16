<template>
    <b-container v-if="clubStats">
        <b-row>
            <b-col>
                <h5>Návrhy zákonov</h5>
                <ul>
                    <li>Podané: {{ clubStats.billCount }}</li>
                    <li>Pozmeňovacie ku koaličným: {{ clubStats.amendmentCoalition }}</li>
                    <li>Pozmeňovacie k opozičným: {{ clubStats.amendmentOpposition }}</li>
                    
                </ul>
            </b-col>
            <b-col>
                <h5>Rozprava</h5>
                <ul>
                    <li>Celkom: </li>
                    <li>Celkom ku koaličným návrhom: {{ clubStats.debateCountCoalition }}</li>
                    <li>Celkom k opozičným návrhom: {{ clubStats.debateCountOpposition }}</li>
                    <li>Čas ku koaličným: {{ secondsToTime(clubStats.debateSecondsCoalition) }}</li>
                    <li>Čas k opozičným: {{ secondsToTime(clubStats.debateSecondsOpposition) }}</li>
                    <li>Na poslanca koaličné: </li>
                    <li>Na poslanca opozičné: </li>
                </ul>
            </b-col>
            <b-col>
                <h5>Interpelácie</h5>
                <ul>
                    <li>Podané: {{ clubStats.interpellationCount }}</li>
                </ul>
            </b-col>
        </b-row>
        <hr>
        <b-row>
            <b-col>
                <h5>Hlasovania</h5>
                <b-row>
                    <b-col>
                        <h6>Koaličné návrhy</h6>
                        graf
                    </b-col>
                    <b-col>
                        <h6>Opozičné návrhy</h6>
                        graf
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h6>Koaličné pozmeňujúce návrhy</h6>
                        graf
                    </b-col>
                    <b-col>
                        <h6>Opozičné pozmeňujúce návrhy</h6>
                        graf
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "ClubOverviewTab",
  props: {
    clubId: { type: String, required: true, default: "" },
  },
  data() {
    return {
      billItems: [],
      billFields: ["Druh", "Podané"],
    };
  },
  methods: {
      secondsToTime(secs) {
          const hours = Math.floor(secs / 3600);
          const totalSeconds = secs % 3600;
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          console.log(secs);
          return hours + ':' + minutes + ':' + seconds;
      },
  },
  apollo: {
    clubStats: {
      query: gql`
        query clubStats($clubId: ID!) {
          clubStats(club: $clubId) {
            billCount
            amendmentCoalition
            amendmentOpposition
            interpellationCount
            debateCountCoalition
            debateCountOpposition
            debateSecondsCoalition
            debateSecondsOpposition
          }
        }
      `,
      variables() {
        return {
          clubId: this.clubId,
        };
      },
    },
  },
};
</script>
