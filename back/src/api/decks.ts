import {executePrismaQuery} from "../db";
import {Response} from "express";

export async function getDecks(res: Response) {
    const decks = await executePrismaQuery(async (prisma) => {
        return await prisma.deck.findMany({
            include: {
                cards: true
            }
        });
    })
    res.send(decks);
}

export async function getDeck(res: Response, id: string) {
    const decks = await executePrismaQuery(async (prisma) => {
        return await prisma.deck.findFirstOrThrow({
            where: {
                id: parseInt(id)
            },
            include: {
                cards: true
            }
        });
    })
    res.send(decks);
}
