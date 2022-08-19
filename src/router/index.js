import { createRouter, createWebHistory } from '@ionic/vue-router';
import MainMenu from '../views/MainMenu.vue';
import ChordQuizMenu from '../views/ChordQuizMenu.vue';
import ChordQuiz from '../views/ChordQuiz.vue';
import ChordQuizSettings from '../views/ChordQuizSettings.vue';

const routes = [
  {
    path: '/',
    redirect: '/ChordQuizMenu'
  },
  /*{
    path: '/MainMenu',
    component: MainMenu,
  },*/
  {
    path: '/ChordQuizMenu',
    component: ChordQuizMenu
  },
  {
    path: '/ChordQuizSettings',
    component: ChordQuizSettings
  },
  {
    path: '/ChordQuiz',
    component: ChordQuiz
  },
  {
    path: '/ChordQuiz/:isPractice',
    component: ChordQuiz
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
