import {AbstractCard, Order} from "./type";
import {BaseCard} from "./BaseCard";
import {Wizard} from "../wizard";
import {CardName} from "../../../../@types/cardsName";
import {HistoryAction} from "../../../../@types/dto/HistoryAction";

export class AttackCard extends BaseCard implements AbstractCard {
    order: Order = 0
    protected readonly damage: number;

    constructor(key:CardName, title:string, damage:number) {
        super(key, title);
        this.damage = damage;
    }

    async action({defender, attacker} : {defender: Wizard, attacker: Wizard}) {
        defender.takeDamage(this.damage);
        return  { action: this.getHistoryAction(defender, attacker), block : false }

    }


    getHistoryAction(defender: Wizard, attacker: Wizard): HistoryAction {
        return {
            player: {
                name: attacker.name,
            },
            card: {
                name: this.title,
                type: "Attack"
            },
            info: `${defender.name} has been attacked by ${this.title} and take ${this.damage} damage`
        }
    }


}
