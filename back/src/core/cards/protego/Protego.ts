import {AbstractCard, BaseCard} from "@/core/base";
import {Wizard} from "@/core/wizard";
import {AVADA_KEDAVRA, PROTEGO} from "@/core/cards/hydrater/cardsName";

export class Protego extends BaseCard implements AbstractCard{
    constructor(name: string) {
        super(PROTEGO, name);
    }
    async action({attacker, defender} : {attacker: Wizard, defender: Wizard}): Promise<boolean> {
        return attacker.currentCard?.key === AVADA_KEDAVRA;

    }
}
