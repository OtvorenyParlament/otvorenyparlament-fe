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
                <b-tab title="Prehľad" active>
                  <clubOverviewTab :clubId="club.id"/>
                </b-tab>
                <b-tab title="Členovia" @click="skipMemberQuery = false">
                    <clubMembers :clubId="club.id" :skipQuery="skipMemberQuery" />
                </b-tab>
                <b-tab title="Návrhy zákonov" @click="skipBillQuery = false">
                  <clubBills :clubId="club.id" :skipQuery="skipBillQuery" />
                </b-tab>
                <b-tab title="Pozmeňujúce a doplňujúce návrhy" @click="skipAmendmentQuery = false">
                  <clubAmendments :clubId="club.id" :skipQuery="skipAmendmentQuery" />
                </b-tab>
                <b-tab title="Interpelácie" @click="skipInterpellationQuery = false">
                  <clubInterpellations :clubId="club.id" :skipQuery="skipInterpellationQuery" />
                </b-tab>
                <b-tab title="Vystúpenia v rozprave">
                </b-tab>
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
  data() {
    return {
      club: {},
      tabIndex: 0,
      skipMemberQuery: true,
      skipBillQuery: true,
      skipAmendmentQuery: true,
      skipInterpellationQuery: true,
    };
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
};
</script>
