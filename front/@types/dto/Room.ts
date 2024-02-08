import {UserDto} from "./User";
import {Card} from "@/store/cards";

export interface RoomDto {
    roomId: string,
    players: UserDto[],
    turn: number,

}

export type BoardCard = {
    card: Card;
    playerId: string;
}