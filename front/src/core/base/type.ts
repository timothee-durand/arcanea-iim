export type Order = 0 | 1 | 2

export interface Card {
    key: string
    title: string
    description?: string
    image?: string
    sound?: string
    order: Order
    action: () => Promise<boolean>
}
