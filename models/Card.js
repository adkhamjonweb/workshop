const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card {

    // korzinaga ma'lumot qo'shadi
    static async add(car) {
        const card = await Card.fetch()
        const idx = card.cars.findIndex(c => c.id === car.id) // 0 1 2
        const condidate = card.cars[idx]
        if (condidate) {
            // demak bu moshina korzina bazasida bor // sonini +1 qo'shib qo'yamiz
            condidate.count++
            card.cars[idx] = condidate
        } else {
            // demak moshina bazada yo'q uni yaratamiz
            car.count = 1 // count elementi qo'shildi {model, id, price, img, count}
            card.cars.push(car)
        }
        // card.price = +car.price + card.price
        card.price += +car.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    // korzinadagi ma'lumotlari oladi
    static fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }

    // remove o'chirish metodi
    static async remove(id) {
        const card = await Card.fetch()
        const idx = card.cars.findIndex(c => c.id === id) // 1
        const car = card.cars[idx] // mercades

        if (car.count === 1) {
            card.cars = card.cars.filter(c => c.id !== id) //
        } else {
            card.cars[idx].count--
        }

        card.price -= car.price


        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(card)
                }
            })
        })
    }
}

module.exports = Card