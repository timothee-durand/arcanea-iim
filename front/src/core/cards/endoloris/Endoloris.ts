import {AbstractCard, BaseCard} from "@/core/base";
import {Wizard} from "@/core/wizard";
import {EndolorisAsyncAction} from "@/core/cards/endoloris/EndolorisAsyncAction";

export class Endoloris extends BaseCard implements AbstractCard {
    damage = 15;
    constructor() {
        super('endoloris', 'Endoloris');
    }

    async action({  defender }: { defender: Wizard}): Promise<boolean> {
        defender.takeDamage(this.damage)
        defender.addAsyncAction(new EndolorisAsyncAction())
        return true
    }
}
