import type {AbstractCard, Order} from "./type";
import {Wizard} from "@/core/wizard/Wizard";

export class BaseCard implements AbstractCard {
    key: string;
    title: string;
    order: Order = 0;
    description?: string;
    image?: string;
    sound?: string;


    constructor(key:string, title:string) {
        this.key = key;
        this.title = title;
    }

    async action(object : {attacker: Wizard, defender: Wizard}): Promise<boolean> {
        throw new Error("Action not implemented")
    }

}
