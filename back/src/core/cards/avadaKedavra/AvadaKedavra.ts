import {AbstractCard, BaseCard} from "../../base";
import {AVADA_KEDAVRA} from "../../../../../@types/cardsName";
import {Wizard} from "../../wizard";
import {HistoryAction} from "../../../../../@types/dto/HistoryAction";


export class AvadaKedavra extends BaseCard implements AbstractCard {
    constructor(name:string) {
        super(AVADA_KEDAVRA, name);
    }

    async action({  defender }: { defender: Wizard}) {
        if(defender.health > 15) return {
            action: this.getHistoryAction(defender, true),
            block: true
        }
        defender.takeDamage(100);
        return { action: this.getHistoryAction(defender, false), block : false }
    }

    getHistoryAction(defender: Wizard, blocked: boolean): HistoryAction {
        return {
            player: {
                name: defender.name,
            },
            card: {
                name: this.title,
                type: "Attack"
            },
            info: blocked ? `${this.title} has no effect on ${defender.name} because it has more than 15hp` :`${defender.name} has been attacked by ${this.title} and take 100 damage`
        }
    }
}
