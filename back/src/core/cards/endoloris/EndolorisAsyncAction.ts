import {AbstractAsyncAction, AsyncActionBase} from "../../base";
import {HistoryAction} from "../../../../@types/dto/HistoryAction";


export class EndolorisAsyncAction extends AsyncActionBase implements AbstractAsyncAction {
    damages= 5;

    constructor() {
        super(3  );

    }

    async action({defender})  : Promise<{action: HistoryAction, block: boolean}> {
        defender.takeDamage(this.damages)
        return {
            action: {
                player: {
                    name: defender.name,
                },
                card: {
                    name: "Endoloris",
                    type: "Attack"
                },
                info: `${defender.name} has been async attacked by Endoloris and take ${this.damages} damage`
            },
            block: false
        }
    }
}
