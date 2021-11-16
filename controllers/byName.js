let express = require('express')
let db = require('../models')
let router = express.Router()
let axios = require('axios')

// POST /ByName list of drinks by name
router.post('/', (req, res) => {
    console.log('this is req.body: ', req.body)
    let drinkName = req.body.byName
    console.log('drink name:', drinkName)
    axios.get(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`)
    .then(apiRes => {
        // console.log('this is apiRes.data.drinks:', apiRes.data.drinks)
        const nameRes = apiRes.data.drinks
        res.render('nameResults', {nameRes: nameRes})
    })
    .catch(error =>{
        console.log(error)
    })
})

router.get('/:id', (req, res) => {
    let drinkId = req.params.id
    console.log('this is req.params.drink.idDrink: ', req.params.byId)
    axios.get(`www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
        .then(apiRes => {
            console.log('this is apiRes.data.drinks: ', apiRes.data.drinks)
            res.send('this is your drink detail page')
        })
        .catch(err => {
            console.log(error)
        })
})


// POST add new favorite drink recipe

// DELETE remove favorite drink from list

module.exports = router