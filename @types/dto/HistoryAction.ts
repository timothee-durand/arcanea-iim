export interface HistoryAction {
    player: {
        name: string,
    },
    card: {
        name: string,
            type: "Attack" | "Defense" | "Utility"
    },
    info: string
}

export class HistoryActionDto {
}
