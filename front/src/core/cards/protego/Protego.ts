import {PrioCard} from "@/core/base";
import {Wizard} from "@/core/wizard";

export class Protego extends PrioCard  {
    async action({attacker, defender} : {attacker: Wizard, defender: Wizard}): Promise<boolean> {
        return attacker.currentCard?.key === "avada-kedavra";

    }
}
