import {AbstractAsyncAction, AsyncActionBase} from "@/core/base";

export class ExpelliarmusAsyncAction extends AsyncActionBase implements AbstractAsyncAction {
    constructor() {
        super(1);
    }

    async action(): Promise<boolean> {
        return false;
    }
}
