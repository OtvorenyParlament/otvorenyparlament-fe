<template>
    <b-container v-if="clubStats">
        <b-row>
            <b-col cols="12" md="4">
                <h5>Návrhy zákonov</h5>
                <ul>
                    <li>Podané: {{ clubStats.billCount }}</li>
                    <li>Pozmeňovacie ku koaličným<sup v-b-tooltip.hover title="Pozmeňovacie podané členmi klubu ku koaličným návrhom">?</sup>: {{ clubStats.amendmentCoalition }}</li>
                    <li>Pozmeňovacie k opozičným<sup v-b-tooltip.hover title="Pozmeňovacie podané členmi klubu k opozičným návrhom">?</sup>: {{ clubStats.amendmentOpposition }}</li>
                    <li>Pozmeňovacie k vládnym návrhom<sup v-b-tooltip.hover title="Pozmeňovacie podané členmi klubu k návrhom vlády">?</sup>: {{ clubStats.amendmentGovernment }}</li>
                    <li>Pozmeňovacie k návrhom výborov<sup v-b-tooltip.hover title="Pozmeňovacie podané členmi klubu k návrhom výborov">?</sup>: {{ clubStats.amendmentCommittee }}</li>
                </ul>
            </b-col>
            <!-- <b-col cols="12" md="4">
                <h5>Rozprava</h5>
                <ul>
                    <li>Vystúpení ku koaličným návrhom<sup v-b-tooltip.hover title="Počet vystúpení v rozprave ku koaličným návrhom">?</sup>: {{ clubStats.debateCountCoalition }}</li>
                    <li>Vystúpení k opozičným návrhom<sup v-b-tooltip.hover title="Počet vystúpení v rozprave k opozičným návrhom">?</sup>: {{ clubStats.debateCountOpposition }}</li>
                    <li>Vystúpení k návrhom výborov<sup v-b-tooltip.hover title="Počet vystúpení v rozprave k návrhom výborov">?</sup>: ?</li>
                    <li>Vystúpení k návrhom vlády<sup v-b-tooltip.hover title="Počet vystúpení v rozprave k návrhom vlády">?</sup>: ?</li>
                    <li>Čas ku koaličným: {{ secondsToTime(clubStats.debateSecondsCoalition) }}</li>
                    <li>Čas k opozičným: {{ secondsToTime(clubStats.debateSecondsOpposition) }}</li>
                </ul>
            </b-col> -->
            <b-col cols="12" md="4">
                <h5>Interpelácie</h5>
                <ul>
                    <li>Podané: {{ clubStats.interpellationCount }}</li>
                </ul>
            </b-col>
        </b-row>
        <b-row>
          <b-col><router-link :to="{name: 'ContactRoute'}">Upozornite nás na chybu</router-link></b-col>
        </b-row>
        <hr>
        <b-row id="club-votings">
            <b-col>
                <h5>Hlasovania</h5>
                <b-row>
                    <b-col cols="12" md="6">
                        <h6>Koaličné návrhy</h6>
                        <voting-pie :data="votingCoalitionSeries"></voting-pie>
                    </b-col>
                    <b-col cols="12" md="6">
                        <h6>Opozičné návrhy</h6>
                        <voting-pie :data="votingOppositionSeries"></voting-pie>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12" md="6">
                        <h6>Vládne návrhy</h6>
                        <voting-pie :data="votingGovernmentSeries"></voting-pie>
                    </b-col>
                    <b-col cols="12" md="6">
                        <h6>Návrhy výborov</h6>
                        <voting-pie :data="votingCommitteeSeries"></voting-pie>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import gql from 'graphql-tag';
import ChartPaletteMixin from '@/mixins/ChartPaletteMixin.js';

export default {
  name: 'ClubOverviewTab',
  mixins: [ChartPaletteMixin],
  components: {
    votingPie: () => import('@/components/voting/VotingPie.vue'),
  },
  props: {
    clubId: { type: String, required: true, default: '' },
  },
  data() {
    return {
      votingCoalitionSeries: {},
      votingOppositionSeries: {},
      votingGovernmentSeries: {},
      votingCommitteeSeries: {},
    };
  },
  methods: {
      secondsToTime(secs) {
          const hours = Math.floor(secs / 3600);
          const totalSeconds = secs % 3600;
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
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
            amendmentGovernment
            amendmentCommittee
            interpellationCount
            debateCountCoalition
            debateCountOpposition
            debateSecondsCoalition
            debateSecondsOpposition
            votingCoalitionFor
            votingCoalitionAgainst
            votingCoalitionAbstain
            votingCoalitionDnv
            votingCoalitionAbsent
            votingOppositionFor
            votingOppositionAgainst
            votingOppositionAbstain
            votingOppositionDnv
            votingOppositionAbsent
            votingGovernmentFor
            votingGovernmentAgainst
            votingGovernmentAbstain
            votingGovernmentDnv
            votingGovernmentAbsent
            votingCommitteeFor
            votingCommitteeAgainst
            votingCommitteeAbstain
            votingCommitteeDnv
            votingCommitteeAbsent
          }
        }
      `,
      variables() {
        return {
          clubId: this.clubId,
        };
      },
      result(data) {
        const res = data.data.clubStats;
        const labels = ['Za', 'Proti', 'Zdržal(a) sa', 'Nehlasoval(a)', 'Neprítomná/ý'];
        this.votingCoalitionSeries = {
          labels,
          datasets: [{
            backgroundColor: this.backgroundColorPalette.slice(0, 5),
            data: [
              res.votingCoalitionFor,
              res.votingCoalitionAgainst,
              res.votingCoalitionAbstain,
              res.votingCoalitionDnv,
              res.votingCoalitionAbsent,
            ],
          }],
        };
        this.votingOppositionSeries = {
          labels,
          datasets: [{
            backgroundColor: this.backgroundColorPalette.slice(0, 5),
            data: [
              res.votingOppositionFor,
              res.votingOppositionAgainst,
              res.votingOppositionAbstain,
              res.votingOppositionDnv,
              res.votingOppositionAbsent,
            ],
          }],
        };

        this.votingGovernmentSeries = {
          labels,
          datasets: [{
            backgroundColor: this.backgroundColorPalette.slice(0, 5),
            data: [
              res.votingGovernmentFor,
              res.votingGovernmentAgainst,
              res.votingGovernmentAbstain,
              res.votingGovernmentDnv,
              res.votingGovernmentAbsent,
            ],
          }],
        };
        this.votingCommitteeSeries = {
          labels,
          datasets: [{
            backgroundColor: this.backgroundColorPalette.slice(0, 5),
            data: [
              res.votingCommitteeFor,
              res.votingCommitteeAgainst,
              res.votingCommitteeAbstain,
              res.votingCommitteeDnv,
              res.votingCommitteeAbsent,
            ],
          }],
        };
      },
    },
  },
};
</script>

<style>
#club-votings canvas {
  height: 240px !important;
}
</style>
