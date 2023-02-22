import {describe,beforeEach, expect, it} from 'vitest';
import {Endoloris} from "./Endoloris";
import {EndolorisAsyncAction} from "./EndolorisAsyncAction";
import {Wizard} from "../../wizard";
import {cards} from "../../../cards";
import {ENDOLORIS} from "../../../../../@types/cardsName";

describe('endoloris', function () {
    let endoloris: Endoloris;
    let defender: Wizard
    let attacker: Wizard
    beforeEach(() => {
        endoloris = new Endoloris(ENDOLORIS);
        defender = new Wizard('defender', cards);
        attacker = new Wizard('attacker', cards);
    })
    it('should return true', async () => {
        const result = await endoloris.action({defender});
        expect(result).toBe(true);
    })
    it('should add the async action', async () => {
        await endoloris.action({defender});
        const asyncAction = defender.asyncCard[0];
        expect(asyncAction).toBeInstanceOf(EndolorisAsyncAction);
    })
    it('should inflict damages over turn and then stop', async () => {
        await endoloris.action({defender});
        await defender.executeAsyncAction(attacker);
        expect(defender.health).toBe(80);
        await defender.executeAsyncAction(attacker);
        expect(defender.health).toBe(75);
        await defender.executeAsyncAction(attacker);
        expect(defender.health).toBe(70);
        await defender.executeAsyncAction(attacker);
        expect(defender.health).toBe(70);
        expect(defender.asyncCard.length).toBe(0);
    })
});
