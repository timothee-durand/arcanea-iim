import {BaseCard} from "./BaseCard";
import {Order} from "./type";
import {Wizard} from "@/core/wizard";

export class PrioCard extends BaseCard {
    order: Order = 1;

    async action({attacker} : {attacker: Wizard}): Promise<boolean> {
       throw new Error("Non implemented")
    }
}
