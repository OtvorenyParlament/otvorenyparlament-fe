<template>
  <b-container :key="$route.fullPath" v-if="allMembers && allMembers.edges">
    <b-row>
      <b-col cols="12" lg="3">
        <h1>{{ allMembers.edges[0].node.person.title }} {{ allMembers.edges[0].node.person.fullName }}</h1>
      </b-col>
      <!-- <b-col cols="6" lg="2">
        <img :src="allMembers.edges[0].node.person.externalPhotoUrl" alt="Alt">
      </b-col> -->
      <b-col cols="6" lg="3">
        <h4>Odkazy</h4>
        <ul>
          <li><a :href="allMembers.edges[0].node.url" target="_blank">Odkaz na NRSR.sk</a></li>
        </ul>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Prehľad" @click="setActive('overview')" :active="activeTab('overview')">
              <memberOverview :member="allMembers.edges[0].node" :currentPeriodNum="$store.state.currentPeriodNum" :defaultPeriodNum="defaultPeriodNum" />
            </b-tab>
            <b-tab title="Hlasovania" @click="setActive('votings')" :active="activeTab('votings')">
              <memberVotings :person="allMembers.edges[0].node.person" :skipQuery="skipVotingQuery" />
            </b-tab>
            <b-tab title="Návrhy zákonov" @click="setActive('bills')" :active="activeTab('bills')">
              <memberBills :memberId="allMembers.edges[0].node.clubMemberships.edges[0].node.member.id" :skipQuery="skipBillQuery" />
            </b-tab>
            <b-tab title="Pozmeňujúce / doplňujúce návrhy" @click="setActive('amendments')" :active="activeTab('amendments')">
              <memberAmendments :memberId="allMembers.edges[0].node.clubMemberships.edges[0].node.member.id" :skipQuery="skipAmendmentQuery" />
            </b-tab>
            <b-tab title="Interpelácie" @click="setActive('interpellations')" :active="activeTab('interpellations')">
              <memberInterpellations :memberId="allMembers.edges[0].node.clubMemberships.edges[0].node.member.id" :skipQuery="skipInterpellationQuery" />
            </b-tab>
            <!-- <b-tab title="Vystúpenia v rozprave" @click="setActive('appearances')" :active="activeTab('appearances')">
              <memberDebateAppearances :memberId="allMembers.edges[0].node.clubMemberships.edges[0].node.member.id" :skipQuery="skipDebateAppearanceQuery" />
            </b-tab> -->
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'MemberDetailView',
  components: {
    memberAmendments: () => import('@/components/member/MemberAmendments.vue'),
    memberBills: () => import('@/components/member/MemberBills.vue'),
    memberDebateAppearances: () => import('@/components/member/MemberDebateAppearances.vue'),
    memberInterpellations: () => import('@/components/member/MemberInterpellations.vue'),
    memberOverview: () => import('@/components/member/MemberOverview.vue'),
    memberVotings: () => import('@/components/member/MemberVotings.vue'),
  },
  data() {
    return {
      defaultPeriodNum: parseInt(process.env.VUE_APP_DEFAULT_PERIOD, 10),
      skipVotingQuery: true,
      skipBillQuery: true,
      skipAmendmentQuery: true,
      skipInterpellationQuery: true,
      skipDebateAppearanceQuery: true,
    };
  },
  metaInfo() {
    return {
      title: this.allMembers && this.allMembers.edges ?
      this.allMembers.edges[0].node.person.fullName : 'Poslanci',
      meta: [
        {property: 'og:url',
         content: process.env.VUE_APP_BASE_URL + this.$route.fullPath},
        {property: 'og:type', content: 'article'},
        {property: 'og:title',
         content: this.allMembers && this.allMembers.edges ?
         this.allMembers.edges[0].node.person.fullName : 'Poslanci'},
        {property: 'og:description',
         content: this.allMembers && this.allMembers.edges ?
         this.allMembers.edges[0].node.person.fullName : 'Poslanci'},
        // {property: 'og:image',
        //  content: this.allMembers && this.allMembers.edges ?
        //  this.allMembers.edges[0].node.person.externalPhotoUrl : ''},
      ],
    };
  },
  updated() {
    this.executeTabSwitch(this.$route.params.tab);
  },
  apollo: {
    allMembers: {
      query: gql`
        query allMembers($periodNum:Int!, $personId:ID!) {
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
                  fullName
                  email
                  externalPhotoUrl
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
                clubMemberships(first:1) {
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
                committeeMemberships {
                  edges {
                    node {
                      id
                      start
                      end
                      membership
                      member {
                        id
                      }
                      committee {
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
  methods: {
    activeTab(tab) {
      const activeTab = this.$route.params.tab;

      if (activeTab) {
        if (activeTab === tab) {
          return true;
        } else {
          return false;
        }
      } else {
        if (tab === 'overview') {
          return true;
        } else {
          return false;
        }
      }
    },
    executeTabSwitch(varToChange) {
      switch (varToChange) {
        case 'votings':
          this.skipVotingQuery = false;
          break;
        case 'bills':
          this.skipBillQuery = false;
          break;
        case 'amendments':
          this.skipAmendmentQuery = false;
          break;
        case 'interpellations':
          this.skipInterpellationQuery = false;
          break;
        case 'appearances':
          this.skipDebateAppearanceQuery = false;
          break;
      }
    },
    setActive(varToChange) {
      if (varToChange === 'overview') {
        this.$router.push({name: 'MemberDetailRoute', params: {id: this.$route.params.id}});
      } else {
        this.$router.push({name: 'MemberDetailRouteTab', params: {id: this.$route.params.id, tab: varToChange}});
      }
    },
  },
};
</script>
