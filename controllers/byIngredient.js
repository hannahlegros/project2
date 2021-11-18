let express = require('express')
let db = require('../models')
let router = express.Router()
let axios = require('axios')

// POST  search for ingredient
router.post('/', (req, res) => {
    let drinkIngr = req.body.byIngr
    console.log('drink ingr:', drinkIngr)
    axios.get(`http://www.thecocktaildb.com/api/json/v1/1/search.php?i=${drinkIngr}`)
    .then(apiRes => {
        // console.log('this is apiRes:', apiRes)
        // console.log('this is apiRes.data:', apiRes.data)
        // console.log('this is apiRes.data.drinks:', apiRes.data.drinks)
        const ingrRes = apiRes.data.ingredients
        res.render('ingrResults', {ingrRes: ingrRes})
    })
    .catch(error =>{
        console.log(error)
    })
})


// router.get('/', (req, res) => {

// })
module.exports = router