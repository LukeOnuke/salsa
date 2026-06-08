import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/user/LoginView.vue'
import UserView from '@/views/user/UserView.vue'
import RegisterView from '@/views/user/RegisterView.vue'
import LogView from '@/views/log/LogView.vue'
import EditLog from '@/views/log/EditLog.vue'
import ProcessListView from '@/views/process/ProcessListView.vue'
import ProcessView from '@/views/process/ProcessView.vue'
import ProcessEditView from '@/views/process/ProcessEditView.vue'
import ProcessNewView from '@/views/process/ProcessNewView.vue'
import ServerNewView from '@/views/server/ServerNewView.vue'
import ServerListView from '@/views/server/ServerListView.vue'
import ServerView from '@/views/server/ServerView.vue'
import ServerEditView from '@/views/server/ServerEditView.vue'
import LocationEditView from '@/views/location/LocationEditView.vue'
import LocationView from '@/views/location/LocationView.vue'
import LocationListView from '@/views/location/LocationListView.vue'
import LocationNewView from '@/views/location/LocationNewView.vue'

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
      path: '/log/view/:id',
      name: 'log',
      component: LogView,
      meta: {
        title: 'View log'
      }
    },
    {
      path: '/log/edit/:id',
      name: 'edit',
      component: EditLog,
      meta: {
        title: 'Edit'
      }
    },
    {
      path: '/process/list/',
      name: 'process-list',
      component: ProcessListView,
      meta: {
        title: 'List Processes'
      }
    },
    {
      path: '/process/view/:id',
      name: 'process-view',
      component: ProcessView,
      meta: {
        title: 'Process View'
      }
    },
    {
      path: '/process/edit/:id',
      name: 'process-edit-view',
      component: ProcessEditView,
      meta: {
        title: 'Process Edit View'
      }
    },
    {
      path: '/process/new',
      name: 'process-new-view',
      component: ProcessNewView,
      meta: {
        title: 'New Process'
      }
    },

    {
      path: '/server/new',
      name: 'server-new-view',
      component: ServerNewView,
      meta: {
        title: 'New Server'
      }
    },
    {
      path: '/server/list',
      name: 'server-list-view',
      component: ServerListView,
      meta: {
        title: 'List Servers'
      }
    },
    {
      path: '/server/view/:id',
      name: 'server-view',
      component: ServerView,
      meta: {
        title: 'Server View'
      }
    },
    {
      path: '/server/edit/:id',
      name: 'server-edit-view',
      component: ServerEditView,
      meta: {
        title: 'Server Edit View'
      }
    },

    {
      path: '/location/new',
      name: 'location-new-view',
      component: LocationNewView,
      meta: {
        title: 'New Location'
      }
    },
    {
      path: '/location/list',
      name: 'location-list-view',
      component: LocationListView,
      meta: {
        title: 'List Locations'
      }
    },
    {
      path: '/location/view/:id',
      name: 'location-view',
      component: LocationView,
      meta: {
        title: 'Location View'
      }
    },
    {
      path: '/location/edit/:id',
      name: 'location-edit-view',
      component: LocationEditView,
      meta: {
        title: 'Location Edit View'
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
