import { defineStore } from "pinia";
import {RoomDto, UserDto} from "../../../@types/dto";

interface Store {
    user: UserDto | null,
    roomId: string | null,
    room: RoomDto | null;
}

export const useAuthStore = defineStore('auth', {
    state: () : Store => ({ user: null, roomId:null, room: null}),
    getters: {
        isUserLogged(state): boolean {
            return !!state.user;
        }
    }
})
