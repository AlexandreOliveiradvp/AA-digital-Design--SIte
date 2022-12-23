import express from "express"
import exphbs from "express-handlebars"
import formSendMail from "./mail/mail.js"
import * as dotenv from 'dotenv'
const port = 3000


const app = express()
const linkWhats = process.env.LINK_WHATS

//Partial invocation function
const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Enable Json
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

//Setting default root for importing static files
app.use(express.static('./'))

//Routes
app.get('/', function (req, res) {
    const portfolio = [
     {title: 'Site Aliança Portuguesa', imgPath: 'public/img/logoalianca.png', idUrl: '#sitealianca'},
     {title: 'Edifica Representações', imgPath: 'public/img/logoEdifica.png', idUrl: '#siteedifica'},
     {title: 'E-commerce Fábrica de Sintéticos', imgPath: 'public/img/logoFabrica.png', idUrl: '#sitefabrica'},
     {title: 'Social Mídia Royal Kllumm', imgPath: 'public/img/logoKllumm.jpg', idUrl: '#royalkllumm'},
     {title: 'Social Mídia Space lanches', imgPath: 'public/img/logoSpacelanches.png', idUrl: '#spacelanches'},
     {title: 'Design de Logos', imgPath: 'public/img/logoEspacobronze.png', idUrl: '#designlogos'} 
]
    const titlePage = 'Home'
    res.render('home', { portfolio: portfolio, titlePage: titlePage, linkWhats: linkWhats })
})

app.get('/portifolio', function (req, res) {
    const titlePage = 'Portifólio'
    res.render('portfolio', { titlePage: titlePage, linkWhats: linkWhats })
})

app.get('/contato', function (req, res) {
    const titlePage = 'Contato'
    res.render('contact', { titlePage: titlePage, linkWhats: linkWhats })
})

app.post('/submit', async function (req, res) {
    try {
        const name = req.body.name
        const email = req.body.email
        const subject = req.body.subject
        const message = req.body.message
        console.log(name, email, subject, message)
        await formSendMail(name, email, subject, message)
        await res.status(200).json({ data: "Dados recebidos com sucesso." })
    } catch (e) {
        res.status(400).json({ data: "Request failed." })
        console.log("ERROR")
    }
})

app.listen(port, function () {
    console.log(`Server running on port ${port}`)
})