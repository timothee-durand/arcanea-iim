import {RouteRecordRaw} from "vue-router";
import {authGuard} from "@/router/guards";

export const LOGIN_ROUTE_NAME = "login";
export const GAME_ROUTE_NAME = "game";


export const routes : RouteRecordRaw[] = [
    {
        path: "/",
        name: LOGIN_ROUTE_NAME,
        component: () => import("../views/LoginView.vue")
    },
    {
        path: "/game",
        name: GAME_ROUTE_NAME,
        component: () => import("../views/GameView.vue"),
        beforeEnter: authGuard
    }
]


