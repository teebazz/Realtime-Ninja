const express = require('express')
const routes = require('./routes/api')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')


//connect to mongodb
//mongoose.connect('mongodb://localhost/restapi')
//mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://orayodeji:Bolaji93,@demo.6dk0l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

//set up express app
const app = express();

//set middleware
app.use(bodyParser.json())

//set static files
app.use(express.static(path.join(__dirname,'public')));



//port
const PORT = 1758 || process.env.PORT

//initialize routes 
app.use('/api', routes)

//error handling middleware
app.use(function(err, req, res, next){
    res.status(422).send({ error: err.message })
    console.log(err)
})

//listen for app
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});
