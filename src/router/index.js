import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TextEditor from '../views/TextEditView.vue'
import predictionsResult from '../components/PredictionsResult.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/text-editor',
      name: 'text-editor',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TextEditor,
    },{
      path:'/predictedResults',
      name:'predicted-result',
      component:predictionsResult
    }
  ]
})

export default router
