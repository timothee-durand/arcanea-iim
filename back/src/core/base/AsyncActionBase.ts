import {AbstractAsyncAction} from "./type";
import {Wizard} from "../wizard";
import {HistoryAction} from "../../../../@types/dto/HistoryAction";


export class AsyncActionBase implements AbstractAsyncAction {
    turns;
    remainingTurns: number

    constructor(turns: number = 1) {
        this.remainingTurns = turns;
        this.turns = turns;
    }


    async action({defender, attacker} : {defender : Wizard, attacker: Wizard}) : Promise<{action: HistoryAction, block: boolean}>{
        throw new Error("Action not implemented")
    }

    passTurn() {
        this.remainingTurns--;
    }
}
