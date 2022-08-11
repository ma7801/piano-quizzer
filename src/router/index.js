import { createRouter, createWebHistory } from '@ionic/vue-router';
import MainMenu from '../views/MainMenu.vue';
import ChordQuizMenu from '../views/ChordQuizMenu.vue';
import ChordQuiz from '../views/ChordQuiz.vue';

const routes = [
  {
    path: '/',
    redirect: '/MainMenu'
  },
  {
    path: '/MainMenu',
    component: MainMenu,
  },
  {
    path: '/ChordQuizMenu',
    component: ChordQuizMenu
  },
  {
    path: '/ChordQuiz/:options',
    component: ChordQuiz
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
