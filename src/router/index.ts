import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router';
import Room from "@/components/room/Room.vue";
import Home from "@/components/home/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/room/:code',
        name: 'room',
        component: Room,
        props: true,
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router