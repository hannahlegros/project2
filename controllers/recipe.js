let express = require('express')
let db = require('../models')
let router = express.Router()
let axios = require('axios')
const byName = require('./recipe')
const isLoggedIn = require('../middleware/isLoggedIn')
const user = require('../models/user')

// POST list of drinks by name
router.post('/', (req, res) => {
    // console.log('this is req.body: ', req.body)
    let drinkName = req.body.byName
    console.log('drink name:', drinkName)
    axios.get(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`)
    .then(apiRes => {
        // console.log('this is apiRes.data.drinks:', apiRes.data.drinks)
        const nameRes = apiRes.data.drinks
        res.render('drinkResults', {nameRes: nameRes})
    })
    .catch(error =>{
        console.log(error)
    })
})

// GET show drinks added to myDrinks
router.get('/myDrinks', isLoggedIn, (req, res) => {
    console.log('this is req.user:', req.user)
    req.user.getRecipes()
    .then(savedRecipes => {
        // console.log('this is savedrecipes:', savedRecipes)
        res.render('myDrinks.ejs', {myDrinks: savedRecipes})
    })
    .catch(error => {
        console.log(error)
    })
})

// POST add favorite drink to myDrinks
router.post('/addMyDrink', isLoggedIn, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    // console.log('this is data:', data)
    db.recipe.findOrCreate({
        where: {
            name: data.drinkName,
            idDrink: data.drinkId
        }
    })
    .then(([createdFave, wasCreated]) => {
        // console.log('db instance created: ', createdFave)
        req.user.addRecipe(createdFave)
        .then(relationInfo => {
            // console.log('this is relationinfo: ', relationInfo)
            res.redirect('/recipe/myDrinks')
        })
    })
    .catch(error => {
        console.log(error)
    })
})

// GET an individual recipe for a drink
router.get('/:id', (req, res) => {
    let drinkId = req.params.id
    // console.log('this is req.params.id: ', req.params.id)
    axios.get(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
        .then(apiResults => {
            // console.log('this is apiRes.data.drinks: ', apiResults.data.drinks)
            let id = apiResults.data.drinks[0].idDrink
            let name = apiResults.data.drinks[0].strDrink
            let img = apiResults.data.drinks[0].strDrinkThumb
            let ingOne = apiResults.data.drinks[0].strIngredient1
            let ingTwo = apiResults.data.drinks[0].strIngredient2
            let ingThree = apiResults.data.drinks[0].strIngredient3
            let ingFour = apiResults.data.drinks[0].strIngredient4
            let ingFive = apiResults.data.drinks[0].strIngredient5
            let ingSix= apiResults.data.drinks[0].strIngredient6
            let ingSeven = apiResults.data.drinks[0].strIngredient7
            let ingEight = apiResults.data.drinks[0].strIngredient8
            let ingNine = apiResults.data.drinks[0].strIngredient9
            let ingTen = apiResults.data.drinks[0].strIngredient10
            let ingEleven = apiResults.data.drinks[0].strIngredient11
            let ingTwelve = apiResults.data.drinks[0].strIngredient12
            let ingThirteen = apiResults.data.drinks[0].strIngredient13
            let ingFourteen = apiResults.data.drinks[0].strIngredient14
            let ingFifteen = apiResults.data.drinks[0].strIngredient15
            let measureOne = apiResults.data.drinks[0].strMeasure1
            let measureTwo = apiResults.data.drinks[0].strMeasure2
            let measureThree = apiResults.data.drinks[0].strMeasure3
            let measureFour = apiResults.data.drinks[0].strMeasure4
            let measureFive= apiResults.data.drinks[0].strMeasure5
            let measureSix= apiResults.data.drinks[0].strMeasure6
            let measureSeven = apiResults.data.drinks[0].strMeasure7
            let measureEight = apiResults.data.drinks[0].strMeasure8
            let measureNine = apiResults.data.drinks[0].strMeasure9
            let measureTen = apiResults.data.drinks[0].strMeasure10
            let measureEleven = apiResults.data.drinks[0].strMeasure11
            let measureTwelve = apiResults.data.drinks[0].strMeasure12
            let measureThirteen = apiResults.data.drinks[0].strMeasure13
            let measureFourteen = apiResults.data.drinks[0].strMeasure14
            let measureFifteen = apiResults.data.drinks[0].strMeasure15
            let instructions = apiResults.data.drinks[0].strInstructions
            res.render('drinkDetail.ejs', {id: id, name: name, img: img, ingOne: ingOne, ingTwo: ingTwo, ingThree: ingThree, ingFour: ingFour, ingFive: ingFive, ingSix: ingSix, ingSeven: ingSeven, ingEight: ingEight, ingNine: ingNine, ingTen: ingTen, ingEleven: ingEleven, ingTwelve: ingTwelve, ingThirteen: ingThirteen, ingFourteen: ingFourteen, ingFifteen: ingFifteen, measureOne: measureOne, measureTwo: measureTwo, measureThree: measureThree, measureFour: measureFour, measureFive: measureFive, measureSix: measureSix, measureSeven: measureSeven, measureEight: measureEight, measureNine: measureNine, measureTen: measureTen, measureEleven: measureEleven, measureTwelve: measureTwelve, measureThirteen: measureThirteen, measureFourteen: measureFourteen, measureFifteen: measureFifteen, instructions: instructions})
        })
        .catch(err => {
            console.log(err)
        })
})

// DELETE favorite
router.delete('/:id', (req, res) => {
    console.log('this is the id: ', req.params.id)
    db.recipe.destroy({
        where: {idDrink: req.params.id}
    })
    .then(deletedItem => {
        console.log('you deleted: ', deletedItem)
        res.redirect('/recipe/myDrinks')
    })
    .catch(error =>{
        console.log(error)
    })
})


module.exports = router