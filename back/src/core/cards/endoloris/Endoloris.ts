import {AbstractCard, BaseCard} from "@/core/base";
import {Wizard} from "@/core/wizard";
import {EndolorisAsyncAction} from "@/core/cards/endoloris/EndolorisAsyncAction";
import {ENDOLORIS} from "@/core/cards/hydrater/cardsName";

export class Endoloris extends BaseCard implements AbstractCard {
    damage = 15;
    constructor(name:string) {
        super(ENDOLORIS, name);
    }

    async action({  defender }: { defender: Wizard}): Promise<boolean> {
        defender.takeDamage(this.damage)
        defender.addAsyncAction(new EndolorisAsyncAction())
        return true
    }
}
