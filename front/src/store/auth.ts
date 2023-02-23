import { defineStore } from "pinia";
import {RoomDto, UserDto} from "../../../@types/dto";
import {Wizard} from "@/core/wizard";

interface Store {
    user: UserDto | null,
    roomId: string | null,
    room: RoomDto | null;
    winner: Wizard | null;
    cards: string[];
    deck: string[];
}

export const useAuthStore = defineStore('auth', {
    state: () : Store => ({ user: null, roomId:null, room: null, winner:null,cards:[], deck : []}),
    getters: {
        isUserLogged(state): boolean {
            return !!state.user;
        }
    }
})
