import {AbstractCard, BaseCard} from "../../base";
import {AVADA_KEDAVRA} from "../../../../../@types/cardsName";
import {Wizard} from "../../wizard";
import {HistoryAction} from "../../../../../@types/dto/HistoryAction";


export class AvadaKedavra extends BaseCard implements AbstractCard {
    constructor(name:string) {
        super(AVADA_KEDAVRA, name);
    }

    async action({  defender, attacker }: { defender: Wizard, attacker: Wizard }) {
        if(defender.health > 15) return {
            action: this.getHistoryAction(defender, attacker, true),
            block: false
        }
        defender.takeDamage(100);
        return { action: this.getHistoryAction(defender, attacker, false), block : false }
    }

    getHistoryAction(defender: Wizard, attacker:Wizard, hasEffect: boolean): HistoryAction {
        return {
            player: {
                name: attacker.name,
            },
            card: {
                name: this.title,
                type: "Attack"
            },
            info: hasEffect ? `${this.title} has no effect on ${defender.name} because it has more than 15hp` :`${defender.name} has been attacked by ${this.title} and take 100 damage`
        }
    }
}
