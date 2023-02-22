import {AbstractCard, BaseCard, HistoryAction} from "../../base";
import {EndolorisAsyncAction} from "./EndolorisAsyncAction";
import {ENDOLORIS} from "../../../../../@types/cardsName";
import {Wizard} from "../../wizard";


export class Endoloris extends BaseCard implements AbstractCard {
    damage = 15;
    constructor(name:string) {
        super(ENDOLORIS, name);
    }

    async action({  defender }: { defender: Wizard})  : Promise<{action: HistoryAction, block: boolean}> {
        defender.takeDamage(this.damage)
        defender.addAsyncAction(new EndolorisAsyncAction())
        return {
            action : {
                player: {
                    name: defender.name,
                },
                card: {
                    name: this.title,
                    type: "Attack"
                },
                info: `${defender.name} has been attacked by ${this.title} and take ${this.damage} damage`
            },
            block : false
        }
    }
}
