let express = require('express')
let db = require('../models')
let router = express.Router()
let axios = require('axios')

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
module.exports = router