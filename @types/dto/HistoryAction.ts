export interface HistoryAction {
    player: {
        name: string,
    },
    card: {
        name: string,
            type: "Attack" | "Defense" | "Utility" | "Block"
    },
    info: string
}

export class HistoryActionDto {
}
