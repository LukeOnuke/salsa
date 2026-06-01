import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieView from '@/views/MovieView.vue'
import ListView from '@/views/ListView.vue'
import LoginView from '@/views/user/LoginView.vue'
import UserView from '@/views/user/UserView.vue'
import RegisterView from '@/views/user/RegisterView.vue'
import NewReservation from '@/views/reservation/NewReservation.vue'
import ReservationView from '@/views/reservation/ReservationView.vue'
import EditReservation from '@/views/reservation/EditReservation.vue'
import ReservationDetails from '@/views/reservation/ReservationDetails.vue'
import LogView from '@/views/log/LogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Log-in'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Register'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
      meta: {
        title: 'User'
      }
    },
    {
      path: '/log/:id',
      name: 'log',
      component: LogView,
      meta: {
        title: 'View log'
      }
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta) {
    document.title = `${to.meta.title} - SALSA`
  }

  next()
})

export default router
