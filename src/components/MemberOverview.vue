<template>
<b-container>
    <b-row>
        <b-col>
            
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'memberOverview',
  props: {
    member: {type: Object, required: true, default: {}},
  },
  data() {
    return {
      currentSessionNumText: String,
      showMoreEnabled: Boolean,
    };
  },
};
</script>