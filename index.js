require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const methodOverride = require('method-override')

// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// body parser middelware
app.use(express.urlencoded({extended:false}))

// method-override
app.use(methodOverride('_method'))

// styling
app.use('/static', express.static('public'))

// session middleware
app.use(session({
    secret: process.env.SUPER_SECRET_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware (must go AFTER session middleware)
app.use(flash())

// custom middleware
app.use((req, res, next) => {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next()
})

// controllers middleware 
app.use('/auth', require('./controllers/auth'))


// home route
app.get('/', (req, res)=>{
    res.render('home')
})

// profile route
app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})

app.use('/recipe', require('./controllers/recipe'))
app.use('/ingredient', require('./controllers/ingredient'))

app.get('/*', (req,res)=>{
    res.render('404')
})


app.listen(process.env.PORT || 3000, ()=>{
    // console.log(`process.env.SUPER_SECRET_SECRET ${process.env.SUPER_SECRET_SECRET}`)
    console.log("drink up on port 3000")
})