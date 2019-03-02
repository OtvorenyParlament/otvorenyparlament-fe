<template>
  <b-container>
    <div v-if="club && club.name">
      <b-row>
        <b-col>
          <h1>{{ club.name }}</h1>
          <p><b-badge variant="success" v-if="club.coalition">Koalícia</b-badge><b-badge variant="info" v-else>Opozícia</b-badge></p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
            <b-card no-body>
            <b-tabs card v-model="tabIndex">
                <b-tab title="Prehľad" @click="setActive('overview')" :active="activeTab('overview')">
                  <clubOverviewTab :clubId="club.id"/>
                </b-tab>
                <b-tab title="Členovia" @click="setActive('members')" :active="activeTab('members')">
                    <clubMembers :clubId="club.id" :skipQuery="skipMemberQuery" />
                </b-tab>
                <b-tab title="Návrhy zákonov" @click="setActive('bills')" :active="activeTab('bills')">
                  <clubBills :clubId="club.id" :skipQuery="skipBillQuery" />
                </b-tab>
                <b-tab title="Pozmeňujúce / doplňujúce návrhy" @click="setActive('amendments')" :active="activeTab('amendments')">
                  <clubAmendments :clubId="club.id" :skipQuery="skipAmendmentQuery" />
                </b-tab>
                <b-tab title="Interpelácie" @click="setActive('interpellations')" :active="activeTab('interpellations')">
                  <clubInterpellations :clubId="club.id" :skipQuery="skipInterpellationQuery" />
                </b-tab>
                <!-- <b-tab title="Vystúpenia v rozprave" @click="setActive('appearances')" :active="activeTab('appearances')"
                  <clubDebateAppearances :clubId="club.id" :skipQuery="skipDebateAppearanceQuery" />
                </b-tab> -->
            </b-tabs>
            </b-card>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'clubdetail',
  components: {
    clubAmendments: () => import('@/components/club/ClubAmendments.vue'),
    clubBills: () => import('@/components/club/ClubBills.vue'),
    clubDebateAppearances: () => import('@/components/club/ClubDebateAppearances.vue'),
    clubInterpellations: () => import('@/components/club/ClubInterpellations.vue'),
    clubMembers: () => import('@/components/club/ClubMembers.vue'),
    clubOverviewTab: () => import('@/components/club/ClubOverviewTab.vue'),
  },
  data() {
    return {
      club: {},
      tabIndex: 0,
      skipMemberQuery: true,
      skipBillQuery: true,
      skipAmendmentQuery: true,
      skipInterpellationQuery: true,
      skipDebateAppearanceQuery: true,
    };
  },
  updated() {
    this.executeTabSwitch(this.$route.params.tab);
  },
  apollo: {
    club: {
      query: gql`query club($id: ID!) {
        club(id:$id) {
          id
          name
          coalition
        }
      }`,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },
  metaInfo() {
    return {
      title: this.club ?
      this.club.name : 'Kluby',
      meta: [
        {property: 'og:url',
         content: process.env.VUE_APP_BASE_URL + this.$route.fullPath},
        {property: 'og:type', content: 'article'},
        {property: 'og:title',
         content: this.club.name ? this.club.name : 'Kluby'},
        {property: 'og:description',
         content: this.club.name ? this.club.name : 'Kluby'},
      ],
    };
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
        case 'members':
          this.skipMemberQuery = false;
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
        this.$router.push({name: 'ClubDetailRoute', params: {id: this.$route.params.id}});
      } else {
        this.$router.push({name: 'ClubDetailRouteTab', params: {id: this.$route.params.id, tab: varToChange}});
      }
    },
  },
};
</script>
