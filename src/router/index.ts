import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router';
import Room from "@/components/room/Room.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/room/:code',
        component: Room,
        props: true,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router