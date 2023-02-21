import {AbstractAsyncAction} from "@/core/base/type";
import {Wizard} from "@/core/wizard";

export class AsyncActionBase implements AbstractAsyncAction {
    turns;
    remainingTurns: number

    constructor(turns: number = 1) {
        this.remainingTurns = turns;
        this.turns = turns;
    }


    action({defender, attacker} : {defender : Wizard, attacker: Wizard}): Promise<boolean> {
        return Promise.resolve(false);
    }

    passTurn() {
        this.remainingTurns--;
    }
}
