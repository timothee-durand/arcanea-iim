import {AbstractCard, BaseCard} from "@/core/base";
import {Wizard} from "@/core/wizard";
import {ExpelliarmusAsyncAction} from "@/core/cards/expelliarmus/ExpelliarmusAsyncAction";
import {EXPELLIARMUS} from "@/core/cards/hydrater/cardsName";

export class Expelliarmus extends BaseCard implements AbstractCard {
    constructor(name: string) {
        super(EXPELLIARMUS, name);
    }

    async action({defender} : { defender: Wizard}): Promise<boolean> {
        const asyncAction = new ExpelliarmusAsyncAction();
        defender.addAsyncAction(asyncAction)
        return true;
    }
}
