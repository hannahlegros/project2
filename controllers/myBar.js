let express = require('express')
let db = require('../models')
let router = express.Router()
const byName = require('./byName')
const isLoggedIn = require('../middleware/isLoggedIn')
const user = require('../models/user')

// GET show ingredients added to myBar
router.get('/', isLoggedIn, (req, res) => {
    req.user.getIngredients()
    .then(savedIng => {
        res.render('myBar.ejs', {myBar: savedIng})
    })
    .catch(error => {
        console.log(error)
    })
})

// POST add ingredient to myBar
router.post('/addToBar', isLoggedIn, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    // console.log('this is data:', data)
    db.ingredient.findOrCreate({
        where: {
            name: data.ingrName
        }
    })
    .then(([createdIng, wasCreated]) => {
        req.user.addIngredients(createdIng)
        .then(relationInfo => {
            res.redirect('/myBar')
        })
    })
    .catch(error => {
        console.log(error)
    })
})
// DELETE ingredient from bar
router.delete('/:id', (req, res) => {
    console.log('this is the id: ', req.params.id)
    db.ingredient.destroy({
        where: {name: req.params.id}
    })
    .then(deletedItem => {
        console.log('you deleted: ', deletedItem)
        res.redirect('/myBar')
    })
    .catch(error => {
        console.log(error)
    })
})

module.exports = router