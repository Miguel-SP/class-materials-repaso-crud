const express = require('express')
const router = express.Router()


const Coaster = require('../models/coaster.model')
const Park = require('../models/park.model')
// Aquí los endpoints

router.get('/new', (req, res) => {
    Park.find()
    .then(allParks => res.render('coasters/new-coaster', { allParks }))
    .catch(err => console.log('Error creando montaña rusa', err))
    
})

router.post('/new', (req, res) => {

    const { name, description, inversions, length, park } = req.body

    Coaster
        .create(req.body)
        .then(()=> res.redirect('/coasters'))
        .catch(err => console.log('Error creando montaña rusa', err))
})

router.get('/', (req, res) => {
    Coaster.find()
    .populate('park')
    .then(allCoasters => res.render('coasters/coasters-index', { allCoasters }))
    .catch(err => console.log('Error mostrando montañas rusas', err))
    
})

router.get('/:id', (req, res) => {
    Coaster.findById(req.params.id)
    .populate('park')
    .then(theCoaster => res.render('coasters/coaster-details', theCoaster))
    .catch(err => console.log('Error mostrando detalles de montaña rusa', err))
    
})

router.get('/delete/:id', (req, res) => {
    Coaster.findByIdAndRemove(req.params.id)
    .then(res.redirect('/coasters'))
    .catch(err => console.log('Error eliminando montaña rusa', err))
    
})


router.get('/edit/:id', (req, res) => {

    const coasterPromise = Coaster.findById(req.params.id)
    const parkPromise = Park.find()

    Promise.all([coasterPromise, parkPromise])
    .then(results => res.render('coasters/coaster-edit', { coaster: results[0], parks: results[1] }))
    .catch(err => console.log('Error editando montaña rusa', err))
    
})

router.post('/edit/:id', (req, res) => {

    const { name, description, inversions, length, park } = req.body

    Coaster.findByIdAndUpdate(req.params.id, req.body)
    .then(()=> res.redirect(`/coasters/${req.params.id}`))
    .catch(err => console.log('Error editando montaña rusa', err))
    
})

module.exports = router