import {executePrismaQuery} from "../db";
import {Response} from "express";

export async function getCards(res: Response) {
    const cards = await executePrismaQuery(async (prisma) => {
        return await prisma.card.findMany();
    })
    res.send(cards);
}
