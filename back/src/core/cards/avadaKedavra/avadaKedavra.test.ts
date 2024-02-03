import {describe,beforeEach, expect, it} from 'vitest';
import {AvadaKedavra} from "./AvadaKedavra";
import {Wizard} from "../../wizard";
import {AVADA_KEDAVRA} from "../../../../@types/cardsName";
import {cards} from "../../../cards";

describe('avada-kedavra', function () {
    let avadaKedavra: AvadaKedavra;
    let defender: Wizard
    beforeEach(() => {
        avadaKedavra = new AvadaKedavra(AVADA_KEDAVRA);
        defender = new Wizard('defender', cards);
    })

    it('should inflict 0 damage if health > 15', async () => {
        await avadaKedavra.action({defender});
        expect(defender.health).toBe(100);
    })

    it('should inflict 100 damage if health < 15', async () => {
        defender.health= 10;
        await avadaKedavra.action({defender});
        expect(defender.health).toBe(-90);
    })
});
