let express = require('express')
let db = require('../models')
let router = express.Router()

// GET show drinks add to Love It
router.get('/', (req, res) => {
    db.recipe.findAll()
        .then(faves => {
            res.render('faveDrinks.ejs', {loveIt: faves})
        })
        .catch(error => {
            console.log(error)
        })
})

// POST add favorite drink to Love It
router.post('/add', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    console.log('this is data:', data)
    // db.recipe.create({


    // })
})


module.exports = router