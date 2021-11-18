let express = require('express')
let db = require('../models')
let router = express.Router()
const byName = require('./byName')
const isLoggedIn = require('../middleware/isLoggedIn')
const user = require('../models/user')

// GET show drinks added to Love It
router.get('/', isLoggedIn, (req, res) => {
    console.log('this is req.user:', req.user)
    req.user.getRecipes()
    .then(savedRecipes => {
        console.log('this is savedrecipes:', savedRecipes)
        res.render('myDrinks.ejs', {myDrinks: savedRecipes})
    })
    
        .catch(error => {
            console.log(error)
        })
})

// POST add favorite drink to Love It
router.post('/addMyDrink', isLoggedIn, (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    console.log('this is data:', data)
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
            console.log('this is relationinfo: ', relationInfo)
            res.redirect('/myDrinks')
        })
    })
    .catch(error => {
        console.log(error)
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
        res.redirect('/myDrinks')
    })
    .catch(error =>{
        console.log(error)
    })
})

module.exports = router