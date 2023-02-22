import {Wizard} from "@/core/wizard";

export class Duel {
    public readonly roomId: string;
    private readonly players: Wizard[];
    private turn: number;

    constructor(roomId: string, playersName: string[]) {
        this.roomId = roomId;
        this.players = playersName.map(player => new Wizard(player));
        this.turn = 0;
    }


}
