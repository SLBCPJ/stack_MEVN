import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Error from '@/views/Error404';
import Login from '@/views/auth/Login';
import Landing from '@/views/Landing';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/notas',
    name: 'Notas',
    component: () => import(/* webpackChunkName: "notas" */ '../views/Notas.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'Usuarios',
    component: () => import(/* webpackChunkName: "users" */ '../views/Usuarios.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dietas',
    name: 'Dietas',
    component: () => import(/* webpackChunkName: "dietas" */ '../views/Dietas.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Registro',

    component: () => import(/* webpackChunkName: "register" */ '../views/Registro.vue')
  },

  {
    path: '/home',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
        isAuth: true
    }
    
  },
  {
      path: '*',
      name: 'error',
      component: Error
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if (to.meta.requiresAuth) {
      //enviamos a autenticar
      if (!localStorage.getItem('token')) {
          next({
              name: 'Login'
          })
      }else{
          next()
      }
  }else{
      next();
  }
  //se crea condicional para no mostrar la vista de login ya cuando una persona ha hecho el login
  if (to.meta.isAuth) {
      if (localStorage.getItem('token')) {
          next({
          name: 'Dashboard'
          });
      }else{
          next()
      }
  }else{
      next()
  }
});

export default router


