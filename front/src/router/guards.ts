import {useAuthStore} from "@/store/auth";
import {LOGIN_ROUTE_NAME} from "@/router/routes";
import {RouteLocation} from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
export const authGuard = (to : RouteLocation): {name:string} | boolean => {
    const store = useAuthStore();
    if(!store.isUserLogged && to.name !== LOGIN_ROUTE_NAME) {
        toast.error("You must be logged in to access this page");
        return {name: LOGIN_ROUTE_NAME};
    }
    return true
}
