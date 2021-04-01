import { createRouter, createWebHistory } from 'vue-router'  

import NotesRoute from './router/NotesRoute.vue'
import TimerRoute from './router/TimerRoute.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/', redirect: '/timer'},
        {path:'/note', component:NotesRoute},
        {path:'/timer', component:TimerRoute},
        
    ]
})

export default router