<template>
<b-row>
<!-- <b-row v-if="club && club.members.edges">
    <memberCard v-for="(node, index) in club.members.edges"
                v-bind:member="node.node.member"
                v-bind:index="index"
                v-bind:key="node.node.member.id">
    </memberCard> -->
    <b-col>
        TODO: Filtered members list
    </b-col>
</b-row>
    
</template>

<script>
export default {
    props: {
        clubId: {type: String, required: true, default: ''},
    },
}
</script>

<style>

</style>
