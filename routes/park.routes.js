const express = require('express')
const router = express.Router()

const Park = require('../models/park.model')


// Aquí los endpoints

router.get('/new', (req, res) => {

    res.render('parks/new-park')
})

router.post('/new', (req, res) => {

    const { name, description } = req.body

    Park
        .create(req.body)
        .then(()=> res.redirect('/parks'))
        .catch(err => console.log('Error creando parque', err))
})


router.get('/', (req, res) => {
    Park.find()
    .then(allParks => res.render('parks/parks-index', { allParks }))
    .catch(err => console.log('Error mostrando parques', err))
    
})


router.get('/:id', (req, res) => {
    Park.findById(req.params.id)
    .then(thePark => res.render('parks/park-details', thePark))
    .catch(err => console.log('Error mostrando detalles del parque', err))
    
})

router.get('/delete/:id', (req, res) => {
    Park.findByIdAndRemove(req.params.id)
    .then(res.redirect('/parks'))
    .catch(err => console.log('Error eliminando parque', err))
    
})

router.get('/edit/:id', (req, res) => {
    Park.findById(req.params.id)
    .then(thePark => res.render('parks/park-edit', thePark))
    .catch(err => console.log('Error editando parque', err))
    
})

router.post('/edit/:id', (req, res) => {

    const { name, description } = req.body

    Park.findByIdAndUpdate(req.params.id, req.body)
    .then(()=> res.redirect('/parks'))
    .catch(err => console.log('Error editando parque', err))
    
})


module.exports = router