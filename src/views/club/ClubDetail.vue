<template>
  <b-container>
    <div v-if="club && club.name">
      <b-row>
        <b-col>
          <h1>{{ club.name }}</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
            <b-card no-body>
            <b-tabs card>
                <b-tab title="Členovia" active>
                    <clubMembers :clubId="club.id"/>
                </b-tab>
                <b-tab title="Klubové návrhy">
                  <clubBills :clubId="club.id"/>
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
    };
  },
  apollo: {
    club: {
      query: gql`query club($id: ID!) {
        club(id:$id) {
          id
          name
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
