import {ExpelliarmusAsyncAction} from "./ExpelliarmusAsyncAction";
import {AbstractCard, BaseCard} from "../../base";
import {EXPELLIARMUS} from "../../../../@types/cardsName";
import {Wizard} from "../../wizard";
import {HistoryAction} from "../../../../@types/dto/HistoryAction";

export class Expelliarmus extends BaseCard implements AbstractCard {
    constructor(name: string) {
        super(EXPELLIARMUS, name);
    }

    async action({defender, attacker}) : Promise<{ action : HistoryAction, block : boolean }>{
        const asyncAction = new ExpelliarmusAsyncAction();
        defender.addAsyncAction(asyncAction)
        return {
            action: {
                player: {
                    name: attacker.name,
                },
                card: {
                    name: this.title,
                    type: "Utility"
                },
                info: `${defender.name} will be blocked by ${this.title} next turn`
            },
            block: false
        }
    }
}
