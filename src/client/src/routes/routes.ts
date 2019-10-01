import Login from '../views/login/Login.vue';

const PageNotFound = () => import(/* webpackChunkName: "404" */ '../views/notFound/PageNotFound.vue');
const Home = () => import(/* webpackChunkName: "register" */ '../views/home/Home.vue');

export default {
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        forVisitors: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        forVisitors: true,
      },
    },
    {
      path: '/404',
      name: 'notFound',
      component: PageNotFound,
    },

    {
      path: '*',
      redirect: '/404',
    },
  ],
};
