<template>
    <b-container v-if="clubStats">
        <b-row>
            <b-col>
                <h5>Návrhy zákonov</h5>
                <ul>
                    <li>Podané: {{ clubStats.billCount }}</li>
                    <li>Pozmeňovacie ku koaličným<sup v-b-tooltip.hover title="Pozmeňovacie podané členmi klubu ku koaličným návrhom">?</sup>: {{ clubStats.amendmentCoalition }}</li>
                    <li>Pozmeňovacie k opozičným<sup v-b-tooltip.hover title="Pozmeňovacie podané členmi klubu k opozičným návrhom">?</sup>: {{ clubStats.amendmentOpposition }}</li>
                    
                </ul>
            </b-col>
            <b-col>
                <h5>Rozprava</h5>
                <ul>
                    <li>Vystúpení ku koaličným návrhom<sup v-b-tooltip.hover title="Počet vystúpení v rozprave ku koaličným návrhom">?</sup>: {{ clubStats.debateCountCoalition }}</li>
                    <li>Vystúpení k opozičným návrhom<sup v-b-tooltip.hover title="Počet vystúpení v rozprave k opozičným návrhom">?</sup>: {{ clubStats.debateCountOpposition }}</li>
                    <!-- <li>Čas ku koaličným: {{ secondsToTime(clubStats.debateSecondsCoalition) }}</li>
                    <li>Čas k opozičným: {{ secondsToTime(clubStats.debateSecondsOpposition) }}</li> -->
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
                        <votingPie :pieSeries="votingCoalitionPieSeries" /> 
                    </b-col>
                    <b-col>
                        <h6>Opozičné návrhy</h6>
                        <votingPie :pieSeries="votingOppositionPieSeries" /> 
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'ClubOverviewTab',
  props: {
    clubId: { type: String, required: true, default: '' },
  },
  data() {
    return {
      votingCoalitionPieSeries: [],
      votingOppositionPieSeries: [],
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
  // TODO(Jozef): change ClubStats type so it will return votingCoalition and votingOpposition
  // as grouped item instead of separate fields
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
        this.votingCoalitionPieSeries = [res.votingCoalitionFor, res.votingCoalitionAgainst,
                                         res.votingCoalitionAbstain, res.votingCoalitionDnv,
                                         res.votingCoalitionAbsent];

        this.votingOppositionPieSeries = [res.votingOppositionFor, res.votingOppositionAgainst,
                                         res.votingOppositionAbstain, res.votingOppositionDnv,
                                         res.votingOppositionAbsent];
      },
    },
  },
};
</script>
