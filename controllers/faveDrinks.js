let express = require('express')
let db = require('../models')
let router = express.Router()
const byName = require('./byName')

// GET show drinks added to Love It
router.get('/', (req, res) => {
    db.recipe.findAll()
        .then(faves => {
            console.log(faves)
            res.render('faveDrinks.ejs', {loveIt: faves})
        })
        .catch(error => {
            console.log(error)
        })
})

// POST add favorite drink to Love It
router.post('/addLoveIt', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    console.log('this is data:', data)
    db.recipe.create({
        name: data.drinkName[0],
        drinkId: data.drinkName[1]
    })
    .then (createdFave => {
        // console.log('db instance created: ', createdFave)
        res.redirect('/myLoveIt')
    })
    .catch(error => {
        console.log(error)
    })
})


module.exports = router