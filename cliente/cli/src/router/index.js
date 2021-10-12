import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Error from '@/views/Error404';
import Login from '@/views/auth/Login';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/notas',
    name: 'Notas',
    component: () => import(/* webpackChunkName: "notas" */ '../views/Notas.vue')
  },
  {
    path: '/users',
    name: 'Usuarios',
    component: () => import(/* webpackChunkName: "users" */ '../views/Usuarios.vue')
  },
  {
    path: '/dietas',
    name: 'Dietas',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dietas.vue')
  },
  {
    path: '/register',
    name: 'Registro',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
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
              name: 'login'
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
          name: 'Home'
          });
      }else{
          next()
      }
  }else{
      next()
  }
});

export default router


