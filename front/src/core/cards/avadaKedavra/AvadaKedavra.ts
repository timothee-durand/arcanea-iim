import {AbstractCard, AttackCard, BaseCard} from "@/core/base";
import {Wizard} from "@/core/wizard";

export class AvadaKedavra extends BaseCard implements AbstractCard {
    constructor() {
        super('avada-kedavra', 'Avada Kedavra');
    }

    async action({  defender }: { defender: Wizard}): Promise<boolean> {
        if(defender.health > 15) return true
        defender.takeDamage(100);
        return false;
    }
}
