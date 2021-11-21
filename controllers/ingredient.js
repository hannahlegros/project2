let express = require('express')
let db = require('../models')
let router = express.Router()
let axios = require('axios')
const byName = require('./recipe')
const isLoggedIn = require('../middleware/isLoggedIn')
const user = require('../models/user')

// POST  search for ingredient
router.post('/', (req, res) => {
    let drinkIngr = req.body.byIngr
    // console.log('drink ingr:', drinkIngr)
    axios.get(`http://www.thecocktaildb.com/api/json/v1/1/search.php?i=${drinkIngr}`)
    .then(apiRes => {
        // console.log('this is apiRes.data:', apiRes.data)
        const ingrRes = apiRes.data.ingredients
        res.render('ingrResults', {ingrRes: ingrRes})
    })
    .catch(error =>{
        console.log(error)
    })
})

// GET show ingredients added to myBar
router.get('/myBar', isLoggedIn, (req, res) => {
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
            res.redirect('/ingredient/myBar')
        })
    })
    .catch(error => {
        console.log(error)
    })
})

// GET list of drinks with selected ingredient
router.get('/:id', (req, res) => {
    let ingred = req.params.id
    // console.log('ingredient:', ingred)
    axios.get(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingred}`)
    .then(apiRes => {
        console.log(apiRes.data)
        const ingrRes = apiRes.data.drinks
        // console.log('ingred results: ', ingrRes)
        res.render('drinksByIng.ejs', {ingrRes: ingrRes, ingred: ingred})
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
        res.redirect('/ingredient/myBar')
    })
    .catch(error => {
        console.log(error)
    })
})

module.exports = router