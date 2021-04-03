import { createRouter, createWebHistory } from 'vue-router'  

import NotesRoute from './router/NotesRoute.vue'
import TimerRoute from './router/TimerRoute.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/', redirect: '/timers'},
        {path:'/timers', component:TimerRoute, name: 'timers'},
        {path:'/notes', component:NotesRoute, name: 'notes'},
        
    ]
})

export default router