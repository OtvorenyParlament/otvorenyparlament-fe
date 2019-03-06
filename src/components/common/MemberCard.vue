<template>
    <b-card no-body class="mb-1" v-if="member">
        <!-- <router-link :to="{ name: 'MemberDetailRoute', params: { id: member.person.id }}"><img class="card-img-top" :src="member.person.externalPhotoUrl" alt="Alt" style="max-width: 8rem"></router-link> -->
        <router-link :to="{ name: 'MemberDetailRoute', params: { id: member.person.id }}"><img class="card-img-top" src="../../assets/img/blank-picture.png" alt="Alt" style="max-width: 8rem"></router-link>
        <b-card-body>
            <span class="card-title"><router-link :to="{ name: 'MemberDetailRoute', params: { id: member.person.id }}">{{ member.person.forename }}<br/>{{ member.person.surname }}</router-link></span>
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
    height: 40vw;
    object-fit: cover;
}

@media (min-width: 768px) {
    .card-img-top {
        height: 12vw;
    }
}
</style>
