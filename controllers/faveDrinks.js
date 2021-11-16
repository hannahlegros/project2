let express = require('express')
let db = require('../models')
let router = express.Router()

router.post('/addLoveIt', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    console.log('this is data:', data)
    db.recipe.create({
        
    })
})


module.exports = router