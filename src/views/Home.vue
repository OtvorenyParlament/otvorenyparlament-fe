<template>
    <b-container id="main">
        <b-row>
            <b-col cols="8">
                <b-row>
                    A
                </b-row>
            </b-col>
            <b-col>
                <b-row>
                    <b-col>
                        B
                    </b-col>
                    <b-col>
                        C
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import gql from 'graphql-tag';


export default {
  data() {
    return {
      items: [],
    };
  },
};
</script>
