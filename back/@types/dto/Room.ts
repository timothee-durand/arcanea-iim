import {UserDto} from "./User";

export interface RoomDto {
    roomId: string,
    players: UserDto[],
    turn: number,

}
