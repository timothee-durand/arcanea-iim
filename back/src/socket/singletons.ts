import {Duel} from "../core/duel";


export let rooms: Duel[] = [];
export let wizardsRoom: Record<string, string> = {};

export function findRoom(roomId:string) : Duel | undefined {
    return rooms.find(r => {
        return r.roomId === roomId
    })
}
