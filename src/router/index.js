import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks.vue'
import Task from '../views/Task.vue'

const routes = [
  {
    path: '/',
    name: 'tasks',
    component: Tasks
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('../views/New.vue')
  },
  { path: '/task/:id', 
    component: Task 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
