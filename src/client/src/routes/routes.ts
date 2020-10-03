import Login from '../views/login/Login.vue';

const PageNotFound = () => import(/* webpackChunkName: "404" */ '../views/notFound/PageNotFound.vue');
const Home = () => import(/* webpackChunkName: "Home" */ '../views/home/Home.vue');

export default {
  routes: [
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
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        forAuth: true,
      },
    },

    {
      path: '/register',
      redirect: '/login',
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
};
