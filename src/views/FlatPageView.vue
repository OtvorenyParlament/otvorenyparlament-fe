<template>
  <b-container v-if="flatPage">
    <h1>{{ flatPage.title }}</h1>
    <div v-html="flatPage.content" />
  </b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'FlatPageView',
  metaInfo() {
    return {
      title: this.flatPage ? this.flatPage.title : 'Flat page',
      meta: [
        {property: 'og:url',
          content: process.env.VUE_APP_BASE_URL + this.$route.fullPath},
        {property: 'og:type', content: 'article'},
        {property: 'og:title',
          content: this.flatPage ? this.flatPage.title : 'Flat page'},
        {property: 'og:description',
          content: this.flatPage ? this.flatPage.title : 'Flat page'},
      ],
    };
  },
  apollo: {
    flatPage: {
      query: gql`
        query flatPage($url: String!) {
          flatPage(url: $url) {
            title
            content
          }
        }
      `,
      variables() {
        return {
          url: this.$route.path + '/',
        };
      },
    },
  },
};
</script>
