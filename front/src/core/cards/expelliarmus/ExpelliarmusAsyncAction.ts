import {AsyncAction} from "@/core/base";

export class ExpelliarmusAsyncAction implements AsyncAction {
    turns = 1;
    remainingTurns: number = 0;

    async action(): Promise<boolean> {
        return false;
    }
}
