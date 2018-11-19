<template>
    <b-card no-body class="mb-1" v-if="member">
        <router-link :to="{ name: 'memberdetail', params: { id: member.person.id }}"><img class="card-img-top" :src="member.person.externalPhotoUrl" alt="Alt" style="max-width: 12rem"></router-link>
        <b-card-body>
            <h6 class="card-title"><router-link :to="{ name: 'memberdetail', params: { id: member.person.id }}">{{ member.person.fullName }}</router-link></h6>
        </b-card-body>
    </b-card>
</template>

<script>
export default {
  name: 'MemberCard',
  props: {
    member: {type: Object, required: true, default: {}},
  },
};
</script>

<style lang="scss" scoped>
div.card {
  margin: 5px;
}
.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}
</style>
