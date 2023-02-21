import {AbstractCard, BaseCard} from "@/core/base";
import {Wizard} from "@/core/wizard";
import {AVADA_KEDAVRA} from "@/core/cards/hydrater/cardsName";

export class AvadaKedavra extends BaseCard implements AbstractCard {
    constructor(name:string) {
        super(AVADA_KEDAVRA, name);
    }

    async action({  defender }: { defender: Wizard}): Promise<boolean> {
        if(defender.health > 15) return true
        defender.takeDamage(100);
        return false;
    }
}
