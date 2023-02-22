import {AbstractCard, Order} from "./type";
import {Wizard} from "../wizard";
import {CardName} from "../../../../@types/cardsName";
import {HistoryAction} from "../../../../@types/dto/HistoryAction";

export class BaseCard implements AbstractCard {
    key: CardName;
    title: string;
    order: Order = 0;
    description?: string;
    image?: string;
    sound?: string;


    constructor(key:CardName, title:string) {
        this.key = key;
        this.title = title;
    }

    async action(object : {attacker: Wizard, defender: Wizard}): Promise<{ action : HistoryAction, block : boolean }> {
        throw new Error("Action not implemented")
    }


}
