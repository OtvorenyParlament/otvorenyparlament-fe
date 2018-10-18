<template>
  <b-container>
    <b-row v-if="person">
      <b-col col lg="3">
        <h1>{{ person.fullName }}</h1>
        <p>{{ person.residence.fullName }}</p>
      </b-col>
      <b-col col lg="2">
        <img :src="person.externalPhotoUrl" alt="Alt">
      </b-col>
      <b-col col lg="2">
        <h4>Kontakty</h4>
        <ul>
          <li>Email</li>
          <li>Facebook</li>
          <li>Web</li>
        </ul>
      </b-col>
    </b-row>
    <b-row v-if="person && person.memberships && person.memberships.edges.length > 0">
      <b-col>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Hlasovania" active>
              <votes :person="person"></votes>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>{{ $t('message.notAPeriodMember') }}</b-col>
    </b-row>
  </b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'memberdetail',
  apollo: {
    person: {
      query: gql`
        query person($id: ID!) {
          person(id: $id) {
            id
            fullName
            externalPhotoUrl
            residence {
              fullName
            }
            memberships {
              edges {
                node {
                  id
                  period {
                    id
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.id,
          periodNum: this.$store.state.currentPeriodNum,
        };
      },
    },
  },
};
</script>
