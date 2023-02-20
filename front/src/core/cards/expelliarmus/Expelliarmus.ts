import {AbstractCard, BaseCard} from "@/core/base";
import {Wizard} from "@/core/wizard";
import {ExpelliarmusAsyncAction} from "@/core/cards/expelliarmus/ExpelliarmusAsyncAction";

export class Expelliarmus extends BaseCard implements AbstractCard {
    constructor() {
        super('expelliarmus', 'Expelliarmus');
    }

    async action({defender} : { defender: Wizard}): Promise<boolean> {
        const asyncAction = new ExpelliarmusAsyncAction();
        defender.addAsyncAction(asyncAction)
        return true;
    }
}
