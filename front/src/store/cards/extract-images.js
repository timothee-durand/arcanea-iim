import fs from 'fs'

const cards = JSON.parse(fs.readFileSync('cards.json'))
const newCards = []
const cardsImports = []
cards.forEach(card => {
    console.log(card)
    fs.writeFileSync(`${card.name}.jpg`, card.image.split(';base64,').pop(), {encoding: 'base64'})
    cardsImports.push(`import ${card.key} from './${card.name}.jpg'`)
    newCards.push({
        ...card,
        image: card.key
    })
})

fs.writeFileSync('cards-content.ts', `${cardsImports.join('\n')}\n export const cards = ${JSON.stringify(newCards, null, 4)}`)

