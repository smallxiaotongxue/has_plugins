import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/navigator',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      children: [
        {
          path: '/navigator',
          name: 'navigatorMessage',
          component: () => import(/* webpackChunkName: "home" */ './views/navigator/navigator-message.vue')
        }
      ]
    },
  ]
})
