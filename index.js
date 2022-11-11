import express from "express";
import exphbs from "express-handlebars"
const port = 3000

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', function(req, res) {
    res.render('home')
})

app.listen(port, function() {
    console.log(`Server running on port ${port}`)
})