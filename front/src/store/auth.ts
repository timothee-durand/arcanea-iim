import { defineStore } from "pinia";
import {RoomDto, UserDto} from "../../@types/dto";
import {socket} from "@/services/socket";

interface Store {
    user: UserDto | null,
}

export const useAuthStore = defineStore('auth', {
    state: () : Store => ({ user: null}),
    getters: {
        isUserLogged(state): boolean {
            return !!state.user;
        }
    }
})


