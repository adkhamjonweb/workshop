const {
    v4: uuid
} = require('uuid')
const fs = require('fs')
const path = require('path')


class Car {
    constructor(model, price, img) {
        this.model = model
        this.price = price
        this.img = img
        this.id = uuid()
    }

    toJSON() {
        return ({
            model: this.model,
            price: this.price,
            img: this.img,
            id: this.id
        })
    }

    async save() {
        const cars = await Car.getAll() // massiv

        cars.push(this.toJSON())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'cars.json'),
                JSON.stringify(cars),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'cars.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content)) // stringni massiv qilib beradi
                    }
                }
            )
        })
    }

    static async getById(id) {
        const cars = await Car.getAll() // massiv
        return cars.find(c => c.id === id)
    }

    static async update(car) {
        const cars = await Car.getAll() // massiv // index

        const idx = cars.findIndex(c => c.id === car.id) // son
        cars[idx] = car
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'cars.json'),
                JSON.stringify(cars),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }


}

module.exports = Car