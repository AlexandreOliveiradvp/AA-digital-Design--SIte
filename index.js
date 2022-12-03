import express from "express"
import exphbs from "express-handlebars"
import formSendMail from "./mail/mail.js"
const port = 3000

const app = express()

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
    const portfolio = ['Site Aliança Portuguesa', 'Edifica Representações', 'E-commerce Fábrica de Sintéticos', 'Social Mídia Royal Kllumm', 'Social Mídia Space lanches', 'Design de Logos']
    const titlePage = 'Home'
    res.render('home', { portfolio: portfolio, titlePage: titlePage })
})

app.get('/portifolio', function (req, res) {
    const titlePage = 'Portifólio'
    res.render('portfolio', { titlePage: titlePage })
})

app.get('/contato', function (req, res) {
    const titlePage = 'Contato'
    res.render('contact', { titlePage: titlePage })
})

app.post('/submit', function (req, res) {
    try {
        const name = req.body.name
        const email = req.body.email
        const subject = req.body.subject
        const massage = req.body.massage
        formSendMail(name, email, subject, massage)
        let notificationSuccess = true
        res.render('contact', {notificationSuccess: notificationSuccess})
    } catch (e) {
        let notificationDanied = true
        res.render('contact', {notificationDanied: notificationDanied})
        console.log("ERROR")
    }
})

app.listen(port, function () {
    console.log(`Server running on port ${port}`)
})