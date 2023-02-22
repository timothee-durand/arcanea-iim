import {describe,beforeEach, expect, it} from 'vitest';
import {Incendio} from "./Incendio";
import {Wizard} from "../../wizard";
import {INCENDIO} from "../../../../../@types/cardsName";
import {cards} from "../../../cards";

describe('incendio', function () {
    let incendio: Incendio;
    let defender: Wizard
    beforeEach(() => {
        incendio = new Incendio(INCENDIO);
        defender = new Wizard('defender', cards);
    })

    it('should inflict 10 damage', async () => {
        await incendio.action({defender});
        expect(defender.health).toBe(90);
    })
});
