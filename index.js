import express from "express";
import exphbs from "express-handlebars"
const port = 3000

const app = express()

//Partial invocation function
const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Setting default root for importing static files
app.use(express.static('./'))

//Routes
app.get('/', function(req, res) {
    const portfolio = ['Site Aliança Portuguesa', 'Edifica Representações', 'E-commerce Fábrica de Sintéticos', 'Social Mídia Royal Kllumm', 'Social Mídia Space lanches', 'Design de Logos']
    const titlePage = 'Home'
    res.render('home',{portfolio: portfolio , titlePage: titlePage})
})

app.get('/portifolio', function(req, res) {
    const titlePage = 'Portifólio'
    res.render('portfolio',{titlePage: titlePage})
})

app.listen(port, function() {
    console.log(`Server running on port ${port}`)
})