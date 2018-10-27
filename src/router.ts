import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MemberList from './views/MemberList.vue';
import MemberDetail from './views/MemberDetail.vue';
import ClubList from './views/club/ClubList.vue';
import ClubDetail from './views/club/ClubDetail.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/member/',
      name: 'memberlist',
      component: MemberList,
    },
    {
      path: '/member/:id',
      name: 'memberdetail',
      component: MemberDetail,
    },
    {
      path: '/club/',
      name: 'clublist',
      component: ClubList,
    },
    // {
    //   path: '/club/:id',
    //   name: 'clubdetail',
    //   component: ClubDetail,
    // },

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
