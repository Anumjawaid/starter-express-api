const express = require('express')
const routes = require('./routes/routesController');
const cors = require('cors');
const mongoose = require('mongoose');



const app = express()

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

mongoose.set("strictQuery", false);

// mongoose.connect(`mongodb+srv://Anum:anum@cluster0.x9rxwjh.mongodb.net/wheather`
let a = "mongodb+srv://Anum:anum@cluster0.irgo8li.mongodb.net/"


app.all('/', (req, res) => {
    console.log("Just got a request!")
    app.use('/', routes.routes())
    mongoose.connect(a, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
    
        
        console.log('connection successful..');
    }).catch((err) => console.log(err));
    
    res.send('Yo!')
})
app.listen(process.env.PORT || 3000)