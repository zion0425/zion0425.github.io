import { createRouter, createWebHistory } from 'vue-router'
import  QuizView from '@/views/QuizView.vue'
import QuizCreate from '@/views/QuizCreate.vue'
import AnswerView from '@/views/AnswerView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/create',
      component: QuizCreate
    },
    {
      path: '/quiz',
      component: QuizView
    },
    {
      path: '/answer',
      component: AnswerView,
    }
  ]
})

export default router
