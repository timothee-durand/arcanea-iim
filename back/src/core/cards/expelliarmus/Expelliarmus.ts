import {ExpelliarmusAsyncAction} from "./ExpelliarmusAsyncAction";
import {AbstractCard, BaseCard, HistoryAction} from "../../base";
import {EXPELLIARMUS} from "../../../../../@types/cardsName";
import {Wizard} from "../../wizard";

export class Expelliarmus extends BaseCard implements AbstractCard {
    constructor(name: string) {
        super(EXPELLIARMUS, name);
    }

    async action({defender}) : Promise<{ action : HistoryAction, block : boolean }>{
        const asyncAction = new ExpelliarmusAsyncAction();
        defender.addAsyncAction(asyncAction)
        return {
            action: {
                player: {
                    name: defender.name,
                },
                card: {
                    name: this.title,
                    type: "Attack"
                },
                info: `${defender.name} will be blocked by ${this.title} next turn`
            },
            block: false
        }
    }
}
