import {AVADA_KEDAVRA, PROTEGO} from "../../../../@types/cardsName";
import {AbstractCard, BaseCard, Order} from "../../base";
import {Wizard} from "../../wizard";
import {HistoryAction} from "../../../../@types/dto/HistoryAction";

export class Protego extends BaseCard implements AbstractCard {
    order :Order = 1;

    constructor(name: string) {
        super(PROTEGO, name);
    }

    async action({attacker, defender}: { attacker: Wizard, defender: Wizard }) {
        const blocked = defender.currentCard?.key !== AVADA_KEDAVRA;
        return {
            action: this.getHistoryAction(defender,attacker, blocked),
            block: blocked
        }
    }

    getHistoryAction(defender: Wizard,attacker: Wizard, blocked: boolean): HistoryAction {
        return {
            player: {
                name: attacker.name,
            },
            card: {
                name: this.title,
                type: "Defense"
            },
            info: blocked ? `${this.title} has blocked ${defender.name}` : `${this.title} has no effect on ${defender.name} because it is not attacked by Avada Kedavra`
        }
    }
}
