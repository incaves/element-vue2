import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Dashboard from '@/views/dashboard'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      { path: '/dashboard', component: Dashboard },
      { path: '/article', component: Article }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  // 访问的不是登陆页并且没有token
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})
export default router
