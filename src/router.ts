import Vue from 'vue';
import Router from 'vue-router';
import APIView from './views/APIView.vue';
import HomeView from './views/HomeView.vue';
import MemberListView from './views/member/MemberListView.vue';
import MemberDetailView from './views/member/MemberDetailView.vue';
import ClubListView from './views/club/ClubListView.vue';
import ClubDetailView from './views/club/ClubDetailView.vue';
import VotingDetailView from './views/voting/VotingDetailView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'HomeRoute',
      component: HomeView,
    },
    {
      path: '/api/',
      name: 'APIRoute',
      component: APIView,
    },
    {
      path: '/member/',
      name: 'MemberListRoute',
      component: MemberListView,
    },
    {
      path: '/member/:id',
      name: 'MemberDetailRoute',
      component: MemberDetailView,
    },
    {
      path: '/club/',
      name: 'ClubListRoute',
      component: ClubListView,
    },
    {
      path: '/club/:id',
      name: 'ClubDetailRoute',
      component: ClubDetailView,
    },
    {
      path: '/voting/:id',
      name: 'VotingDetailRoute',
      component: VotingDetailView,
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
