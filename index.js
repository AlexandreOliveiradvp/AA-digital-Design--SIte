import express from "express"
import exphbs from "express-handlebars"
import formSendMail from "./mail/mail.js"
import * as dotenv from 'dotenv'


const port = 3000
dotenv.config()
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
        { title: 'Site Aliança Portuguesa', imgPath: 'public/img/logoalianca.png', idUrl: '#sitealianca' },
        { title: 'Edifica Representações', imgPath: 'public/img/logoEdifica.png', idUrl: '#siteedifica' },
        { title: 'E-commerce Fábrica de Sintéticos', imgPath: 'public/img/logoFabrica.png', idUrl: '#sitefabrica' },
        { title: 'Social Mídia Royal Kllumm', imgPath: 'public/img/logoKllumm.jpg', idUrl: '#royalkllumm' },
        { title: 'Social Mídia Amanda Viana Estética', imgPath: 'public/img/logoamandaviana.png', idUrl: '#amandaviana' },
        { title: 'Design de Logos', imgPath: 'public/img/logoEspacobronze.png', idUrl: '#designlogos' }
    ]
    const titlePage = 'Home'
    res.render('home', { portfolio: portfolio, titlePage: titlePage, linkWhats: linkWhats })
})

app.get('/portifolio', function (req, res) {
    const titlePage = 'Portifólio'
    const sites = [
        {
            title: "Site Aliança Portuguesa",
            imgPath: "public/img/sitealianca.png",
            text: "A Aliança portuguesa é uma empresa focada em vistos e cidadania portuguesa. Tivemos o prazer de desenvolvermos o site deste cliente. Seguimos um padrão de design limpo e objetivo com a intenção de porporcionar conforto e comodidade aos clientes enquanto estão navegando por suas páginas. Confira o resultado em:",
            link: "https://aliancaportuguesa.com.br/",
            idSection: "sitealianca"
        },
        {
            title: "Site Edifica Representações",
            imgPath: "public/img/edificarepresentacoes.png",
            text: "Edifica Representações é uma empresa focada em venda de tubulações, materias de combate a incêndios e bombas hidrálicas. Para este cliente desenvolvemos o seu site com foco em demonstrar os produtos com os quais trabalha, localização e meios comunicação com seus clientes. Confira o resultado em:",
            link: "https://edificarepresentacoes.com.br/",
            idSection: "siteedifica"
        },
        {
            title: "E-commerce Fábrica de Sintéticos",
            imgPath: "public/img/fabricasinteticos.png",
            text: "A Fábrica Sintéticos é uma loja virtual de peças sintéticas para a produção de bolsas, carteiras, cintos e etc. Seu design foi pensado para impactar e gerar confiança em seus clientes. Trabalhamos dando destaque para fotos e informações dos seus produtos afim de que os clientes não tenham dúvidas e conheçam tudo o que precisam sobre o produto que estão comprando. Confira o resultado em:",
            link: "https://fabricasinteticos.com.br/",
            idSection: "sitefabrica"
        }
    ]
    const socialMidia = [
        {
            title: "Social Mídia Royal Kllumm",
            imgPath1: "public/img/postKllumm01.jpeg",
            imgPath2: "public/img/postKllumm02.jpeg",
            text: "Royal Kllumm é um salão de festas localizado em Ipatinga, Minas Gerais.Cuidamos da redes sociais deste cliente(Instagram e Facebook). Nosso trabalho com o mesmo consiste em criar conteúdo/ post para divulgação do espaço e trabalho deste belo salão de festas.Cuidamos támbem do primeiro atendimento aos cliente que fazem contato com as redes sociais aplicando assim a estratégia de atendimento desenvolvida pelo nosso cliente.",
            idSection: "royalkllumm"
        },
        {
            title: "Clínica de Estética Amanda Viana",
            imgPath1: "public/img/postAmanda01.jpeg",
            imgPath2: "public/img/postAmanda02.jpeg",
            text: "A Clínica de Estética Amanda Viana fornece os mais variados tipos de procedimentos estéticos femininos, drenagem pós operatório e etc. Para este cliente nós desenvolvemos todo o tipo de conteúdo/post de divulgação do seu trabalho incluindo ofertas que passam pelo planejamento do cliente. Auxiliamos o mesmo também com a montagem de campanhas de marketing que rodam em suas redes sociais.",
            idSection: "amandaviana"
        },
        {
            title: "Design de Logos",
            imgPath1: "public/img/logoTatoo.jpg",
            imgPath2: "public/img/logoEspacobronze.png",
            text: "Desenvolvemos logos para os nossos clientes sempre aliando suas histórias, suas bases e suas estratégias a nossa arte. Nosso principal objetivo é construir uma arte que chame atenção, passe credibilidade e que crie conexões com os seus clientes. Seguimos as melhores tendências estéticas e práticas do mercado afim de entregarmos um material contemporâneo e de extrema qualidade.",
            idSection: "designlogos"
        }
    ]
    res.render('portfolio', { titlePage: titlePage, linkWhats: linkWhats, sites: sites, socialMidia: socialMidia })
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