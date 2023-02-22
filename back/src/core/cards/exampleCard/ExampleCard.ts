import {AbstractCard, BaseCard, HistoryAction} from "../../base";
import {Wizard} from "../../wizard";


export class ExampleCard extends BaseCard implements AbstractCard {
    constructor() {
        super('example', 'Example');
    }

    async action({  defender }: { defender: Wizard}) {
        return {
            action : this.getAction(defender),
            block : false
        }
    }

    getAction(player: Wizard) :HistoryAction{
        return {
            player: {
                name: player.name,
            },
            card: {
                name: this.title,
                type: "Attack"
            },
            info: `Example`
        }
    }
}
