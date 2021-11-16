let express = require('express')
let db = require('../models')
let router = express.Router()
let axios = require('axios')

// POST /ByName list of drinks by name
router.post('/', (req, res) => {
    // console.log('this is req.body: ', req.body)
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
    // console.log('this is req.params.id: ', req.params.id)
    axios.get(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
        .then(apiResults => {
            // console.log('this is apiRes.data.drinks: ', apiRes.data.drinks)
            let name = apiRes.data.drinks.strDrink
            console.log('this is apiResults:', apiResults)
            // let ingOne = apiRes.data.drinks.strIngredient1
            // let ingTwo = apiRes.data.drinks.strIngredient2
            // let ingThree = apiRes.data.drinks.strIngredient3
            // let ingFour = apiRes.data.drinks.strIngredient4
            // let ingFive = apiRes.data.drinks.strIngredient5
            // let ingSix= apiRes.data.drinks.strIngredient6
            // let ingSeven = apiRes.data.drinks.strIngredient7
            // let ingEight = apiRes.data.drinks.strIngredient8
            // let ingNine = apiRes.data.drinks.strIngredient9
            // let ingTen = apiRes.data.drinks.strIngredient10
            // let ingEleven = apiRes.data.drinks.strIngredient11
            // let ingTwelve = apiRes.data.drinks.strIngredient12
            // let ingThirteen = apiRes.data.drinks.strIngredient13
            // let ingFourteen = apiRes.data.drinks.strIngredient14
            // let ingFifteen = apiRes.data.drinks.strIngredient15
            // let measureOne = apiRes.data.drinks.strMeasure1
            // let measureTwo = apiRes.data.drinks.strMeasure2
            // let measureThree = apiRes.data.drinks.strMeasure3
            // let measureFour = apiRes.data.drinks.strMeasure4
            // let measureFive= apiRes.data.drinks.strMeasure5
            // let measureSix= apiRes.data.drinks.strMeasure6
            // let measureSeven = apiRes.data.drinks.strMeasure7
            // let measureEight = apiRes.data.drinks.strMeasure8
            // let measureNine = apiRes.data.drinks.strMeasure9
            // let measureTen = apiRes.data.drinks.strMeasure10
            // let measureEleven = apiRes.data.drinks.strMeasure11
            // let measureTwelve = apiRes.data.drinks.strMeasure12
            // let measureThirteen = apiRes.data.drinks.strMeasure13
            // let measureFourteen = apiRes.data.drinks.strMeasure14
            // let measureFifteen = apiRes.data.drinks.strMeasure15
            // let instructions = apiRes.data.drinks.strInstructions
            res.render('drinkDetail', {name:name})
                // , ingOne:ingOne, ingTwo:ingTwo, ingThree:ingThree, ingFour:ingFour, ingFive:ingFive, ingSix:ingSix, ingSeven:ingSeven, ingEight:ingEight, ingNine:ingNine, ingTen:ingTen, ingEleven:ingEleven, ingTwelve:ingTwelve, ingThirteen:ingThirteen, ingFourteen:ingFourteen, ingFifteen:ingFifteen, measureOne:measureOne, measureTwo:measureTwo, measureThree:measureThree, measureFour:measureFour, measureFive:measureFive, measureSix:measureSix, measureSeven:measureSeven, measureEight:measureEight, measureNine:measureNine, measureTen:measureTen, measureEleven:measureEleven, measureTwelve:measureTwelve, measureThirteen:measureThirteen, measureFourteen:measureFourteen, measureFifteen:measureFifteen, instructions:instructions})
        })
        .catch(err => {
            console.log('err')
        })
})




module.exports = router