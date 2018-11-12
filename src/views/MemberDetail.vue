<template>
  <b-container :key="$route.fullPath" v-if="allMembers && allMembers.edges">
    <b-row>
      <b-col col lg="3">
        <h1>{{ allMembers.edges[0].node.person.title }} {{ allMembers.edges[0].node.person.fullName }}</h1>
        <p>{{ allMembers.edges[0].node.person.residence.fullName }}</p>
      </b-col>
      <b-col col lg="2">
        <img :src="allMembers.edges[0].node.person.externalPhotoUrl" alt="Alt">
      </b-col>
      <b-col col lg="3">
        <h4>Odkazy</h4>
        <ul>
          <li><a :href="allMembers.edges[0].node.url" target="_blank">Odkaz na NRSR.sk</a></li>
          <li><a :href="'mailto:'+allMembers.edges[0].node.person.email">Email NRSR</a></li>
          <li>Facebook</li>
          <li>Web</li>
        </ul>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Prehľad" active>
              <memberOverview :member="allMembers.edges[0].node" :currentPeriodNum="$store.state.currentPeriodNum" :defaultPeriodNum="defaultPeriodNum"></memberOverview>
            </b-tab>
            <b-tab title="Hlasovania">
              <votes :person="allMembers.edges[0].node.person"></votes>
            </b-tab>
            <b-tab title="Návrhy zákonov">
            </b-tab>
            <b-tab title="Pozmeňujúce / doplňujúce návrhy">
              <memberAmendments :memberId="allMembers.edges[0].node.clubMemberships.edges[0].node.member.id"></memberAmendments>
            </b-tab>
            <b-tab title="Vystúpenia v rozprave">
            </b-tab>
            <b-tab title="Interpelácie">
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'memberdetail',
  data() {
    return {
      defaultPeriodNum: parseInt(process.env.VUE_APP_DEFAULT_PERIOD, 10),
    };
  },
  apollo: {
    allMembers: {
      query: gql`
        query allMembers($periodNum:Float!, $personId:ID!) {
          allMembers(period_PeriodNum:$periodNum, person_Id: $personId, first:1) {
            edges {
              node {
                id
                url
                stoodForParty {
                  id
                  name
                }
                person {
                  id
                  title
                  fullName
                  email
                  externalPhotoUrl
                  residence {
                    fullName
                  }
                }
                active {
                  edges {
                    node {
                      id
                      start
                      end
                    }
                  }
                }
                clubMemberships(last:1) {
                  edges {
                    node {
                      id
                      start
                      end
                      member {
                        id
                      }
                      club {
                        id
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          personId: this.$route.params.id,
          periodNum: this.$store.state.currentPeriodNum,
        };
      },
    },
  },
};
</script>
