const {
    Router
} = require('express')
const router = Router()
const Car = require('../models/Cars')

router.get('/', async (req, res) => {
    const cars = await Car.getAll()
    res.render('cars', {
        title: 'Car models',
        isCars: true,
        cars // massiv
    })
})

router.get('/:id', async (req, res) => {
    // console.log(req.params.id);
    const car = await Car.getById(req.params.id) // obyekt
    res.render('car', {
        layout: 'empty',
        title: `Car model ${car.model}`,
        car
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        res.redirect('/')
    }
    const car = await Car.getById(req.params.id) // obyekt

    res.render('car-edit', {
        title: 'Edit car page',
        car
    })
})

router.post('/edit', async (req, res) => {
    await Car.update(req.body)
    res.redirect('/cars')
})


module.exports = router