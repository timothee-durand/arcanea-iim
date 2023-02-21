import {Wizard} from "@/core/wizard";

export type ApiCard = {
    key: string;
    title: string;
    description?: string;
    image?: string;
    sound?: string;
}

export class Duel {
    public readonly roomId: string;
    private readonly players: Wizard[];
    private turn: number;

    constructor(roomId: string, playersName: string[], cards: ApiCard[]) {
        this.roomId = roomId;
        this.players = playersName.map(player => new Wizard(player, cards));
        this.turn = 0;
        console.log(this)
    }
}
