import {PetrificusTotalusAsyncAction} from "./PetrificusTotalusAsyncAction";
import {AbstractCard, BaseCard} from "../../base";
import {PETRIFICUS_TOTALUS} from "../../../../@types/cardsName";
import {HistoryAction} from "../../../../@types/dto/HistoryAction";
import {Wizard} from "../../wizard";

export class PetrificusTotalus extends BaseCard implements AbstractCard {
    damages = 5;
    constructor(name: string) {
        super(PETRIFICUS_TOTALUS, name);
    }

    async action({defender, attacker} : {defender: Wizard, attacker: Wizard}) : Promise<{ action : HistoryAction, block : boolean }>{
        const asyncAction = new PetrificusTotalusAsyncAction();
        defender.takeDamage(this.damages);
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
                info: `${defender.name} will be blocked by ${this.title} next turn and has take ${this.damages} damages`
            },
            block: false
        }
    }
}
