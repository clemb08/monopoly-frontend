import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/games',
      name: 'Games',
      component: () =>
        import(/* webpackChunkName: "bundle.games" */ '../views/Games.vue'),
    },
    {
      path: '/games/add',
      name: 'Add_ùGames',
      component: () =>
        import(/* webpackChunkName: "bundle.games" */ '../views/CreateGame.vue'),
    },
  ],
});
