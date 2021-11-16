let axios = require('axios')
let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /ByName list of drinks by name
router.post('/', (req, res) => {
    console.log('test')
    let drinkName = req.body.byName
    console.log('drink name:', drinkName)
    axios.get(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`)
    .then(apiRes => {
        console.log('this is apiRes:', apiRes)
        console.log('this is apiRes.data:', apiRes.data)
        console.log('this is apiRes.data.drinks:', apiRes.data.drinks)
        const nameRes = apiRes.data.drinks
        res.render('nameResults', {nameRes: nameRes})
    })
    .catch(error =>{
        console.error('error')
    })
})
// router.get('/:drink', (req, res) => {

// })


// POST add new favorite drink recipe

// DELETE remove favorite drink from list

module.exports = router