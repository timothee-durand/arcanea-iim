import {AVADA_KEDAVRA, PROTEGO, VULNERA_SANENTUR} from "../../../../@types/cardsName";
import {AbstractCard, BaseCard, Order} from "../../base";
import {Wizard} from "../../wizard";
import {HistoryAction} from "../../../../@types/dto/HistoryAction";

export class VulneraSanentur extends BaseCard implements AbstractCard {
    health = 20;

    constructor(name: string) {
        super(VULNERA_SANENTUR, name);
    }

    async action({attacker, defender}: { attacker: Wizard, defender: Wizard }) {
        attacker.health += this.health;
        return {
            action: this.getHistoryAction(defender,attacker),
            block: false
        }
    }

    getHistoryAction(defender: Wizard,attacker: Wizard): HistoryAction {
        return {
            player: {
                name: attacker.name,
            },
            card: {
                name: this.title,
                type: "Defense"
            },
            info: `${defender.name} has been healed by ${this.health}`
        }
    }
}
