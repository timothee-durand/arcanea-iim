import {AbstractCard, BaseCard} from "../../base";
import {EndolorisAsyncAction} from "./EndolorisAsyncAction";
import {ENDOLORIS} from "../../../../../@types/cardsName";
import {Wizard} from "../../wizard";
import {HistoryAction} from "../../../../../@types/dto/HistoryAction";


export class Endoloris extends BaseCard implements AbstractCard {
    damage = 15;
    constructor(name:string) {
        super(ENDOLORIS, name);
    }

    async action({  defender, attacker }: { defender: Wizard, attacker: Wizard})  : Promise<{action: HistoryAction, block: boolean}> {
        defender.takeDamage(this.damage)
        defender.addAsyncAction(new EndolorisAsyncAction())
        return {
            action : {
                player: {
                    name: attacker.name,
                },
                card: {
                    name: this.title,
                    type: "Unforgivable"
                },
                info: `${defender.name} has been attacked by ${this.title} and take ${this.damage} damage`
            },
            block : false
        }
    }
}
