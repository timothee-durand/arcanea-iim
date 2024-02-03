import {Duel} from "../core/duel";
import {RedisClientType} from "redis";


export let rooms: Duel[] = [];
export let wizardsRoom: Record<string, string> = {};

export function findRoom(roomId:string) : Duel | undefined {
    return rooms.find(r => {
        return r.roomId === roomId
    })
}

export function deleteRoom(roomId: string) {
    rooms = rooms.filter(r => r.roomId !== roomId)
    console.log("delete room : ", roomId)
}
