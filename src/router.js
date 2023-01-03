import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/layouts/Index.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/user-additions',
            name: 'Index',
            component: Index,
            meta: {layout: 'main'}
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
                top: 60,
            }
        }
    },
})

export default router