import {AbstractCard, HistoryAction, Order} from "./type";
import {BaseCard} from "./BaseCard";
import {Wizard} from "../wizard";
import {CardName} from "../../../../@types/cardsName";

export class AttackCard extends BaseCard implements AbstractCard {
    order: Order = 0
    protected readonly damage: number;

    constructor(key:CardName, title:string, damage:number) {
        super(key, title);
        this.damage = damage;
    }

    async action({defender} : {defender: Wizard}) {
        defender.takeDamage(this.damage);
        return  { action: this.getHistoryAction(defender), block : false }

    }


    getHistoryAction(defender: Wizard): HistoryAction {
        return {
            player: {
                name: defender.name,
            },
            card: {
                name: this.title,
                type: "Attack"
            },
            info: `${defender.name} has been attacked by ${this.title} and take ${this.damage} damage`
        }
    }


}
