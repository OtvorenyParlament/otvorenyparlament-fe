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
  // data() {
  //   return {
  //     route: this.$route,
  //   };
  // },
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
