import express from "express";
import exphbs from "express-handlebars"
const port = 3000

const app = express()

//Função de invocação dos partials
const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Definindo raiz padrão para importação de arquivos estáticos 
app.use(express.static('./'))

//Rotas
app.get('/', function(req, res) {
    res.render('home')
})

app.listen(port, function() {
    console.log(`Server running on port ${port}`)
})