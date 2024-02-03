import {AbstractAsyncAction, AsyncActionBase} from "../../base";
import {HistoryAction} from "../../../../@types/dto/HistoryAction";

export class ExpelliarmusAsyncAction extends AsyncActionBase implements AbstractAsyncAction {
    constructor() {
        super(1);
    }

    async action({defender}): Promise<{ action : HistoryAction, block : boolean }> {
        return {
            block : true,
            action: {
                player: {
                    name: defender.name,
                },
                card: {
                    name: "Expelliarmus Async Action",
                    type: "Attack"
                },
                info: `${defender.name} has been blocked by Expelliarmus`
            }
        }
    }
}
