import {AbstractCard, BaseCard} from "@/core/base";
import {Wizard} from "@/core/wizard";

export class ExampleCard extends BaseCard implements AbstractCard {
    constructor() {
        super('example', 'Example');
    }

    async action({  defender }: { defender: Wizard}): Promise<boolean> {
        return false
    }
}
