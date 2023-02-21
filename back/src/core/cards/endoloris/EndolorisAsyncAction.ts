import {AbstractAsyncAction, AsyncActionBase} from "@/core/base";
import {Wizard} from "@/core/wizard";

export class EndolorisAsyncAction extends AsyncActionBase implements AbstractAsyncAction {
    damages= 5;

    constructor() {
        super(3  );

    }

    async action({defender}: {defender: Wizard}): Promise<boolean> {
        defender.takeDamage(this.damages)
        return true
    }
}
