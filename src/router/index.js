import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Missing from '../views/Missing.vue'
import CustomerDetail from '../views/CustomerDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/customer/:id',
    name: 'CustomerDetail',
    component: CustomerDetail
  },
  {
    path: '*',
    name: 'Missing',
    component: Missing
  }
  
]

const router = new VueRouter({  
  routes,
  mode:"history"
})


router.beforeEach((to, from, next) => {
 
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }else{
    next();
  }

})

export default router
