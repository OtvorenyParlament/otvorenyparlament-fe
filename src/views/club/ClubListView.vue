<template>
  <b-container v-if="allClubs && allClubs.edges && polarityChartSeries">
    <b-row>
      <b-col>
        <b-row><b-col>
          <h1>Zoznam klubov</h1>
          <p v-for="node in allClubs.edges" :key="node.node.id">
            <router-link :to="{ name: 'ClubDetailRoute', params: { id: node.node.id }}">{{ node.node.name }}</router-link> {{ node.node.currentMemberCount }}&nbsp;členov
            <b-badge variant="success" v-if="node.node.coalition">Koalícia</b-badge>
          </p>
        </b-col></b-row>
        <b-row>
          <b-col>
            <b-alert show variant="secondary">Počet členov je zobrazený k aktuálnemu kalendárnemu dňu. Príslušnosť ku klubu je približná podľa klubu, za ktorý v konkrétny deň osoba hlasuje, keďže jednoznačné dátumy od-do nie sú na nrsr.sk zverejňované. Preto ak poslanec opustil/zmenil klub, zmena sa prejaví až ku dňu nasledujúceho hlasovania.</b-alert>
          </b-col>
        </b-row>
      </b-col>
      <b-col>
        <b-row>
          <b-col cols="12">
            <polarityChart title="Kreslá podľa pólov" v-if="polarityChartSeries" :chartSeries="polarityChartSeries" :chartLabels="[polarityNameCoalition, polarityNameOpposition]"/>
          </b-col>
          <b-col cols="12">
            <clubChart title="Kreslá podľa klubov" v-if="seatChartSeries && seatChartLabels.length > 0" :chartSeries="seatChartSeries" :chartLabels="seatChartLabels"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ClubListMixin from '@/mixins/ClubListMixin.js';

export default {
  name: 'ClubListView',
  mixins: [ClubListMixin],
};
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 10px;
}
</style>