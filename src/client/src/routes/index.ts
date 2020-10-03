import routes from './routes';
import store from '@/store';

/**
 * Add navigation guards to the router.
 *
 * @param {Router} constructor
 * @returns {Router} router
 */
export function routerFactory(constructor: any) {
  const router = new constructor(routes);

  /**
   * Navigation guards.
   */
  router.beforeEach((to: any, from: any, next: any) => {
    if (to.matched.some((record: any) => record.meta.forAuth)) {
      if (!store.getters['user/isLoggedIn']) {
        next({ path: '/login' });
      } else {
        next();
      }
    } else if (to.matched.some((record: any) => record.meta.forVisitors)) {
      if (store.getters['user/isLoggedIn']) {
        next({ path: '/' });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  return router;
}
