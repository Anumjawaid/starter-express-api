const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
var Account = require('./Controller/account')
var Ledger=require('./Controller/ledger')
var Trial=require('./Controller/trial')


const app = express()

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

mongoose.set("strictQuery", false);

// mongoose.connect(`mongodb+srv://Anum:anum@cluster0.x9rxwjh.mongodb.net/wheather`
let a = "mongodb+srv://Anum:anum@cluster0.irgo8li.mongodb.net/ERP-test"
let b="mongodb://localhost:27017/ERP"




    app.get("/",(req,res)=>{ return res.status(200).send({message:"ALL DONE AND RUNNING"})})

    // *******************Account app***************************************
    app.post('/addaccount', Account.Addaccount)
    app.get('/getaccount', Account.GetAllaccounts)

    // *******************Ledger app***************************************

    app.post("/addledger",Ledger.AddLedger)
    app.get('/getallledger',Ledger.GetAllLedger)

    // *******************Trial app***************************************

    app.get('/trialbalance',Trial.TrialBalance)

     // *******************Income Stament app***************************************

     app.get('/incomestatement',Trial.IncomeStatment)

     // *******************Balance Sheet app***************************************

     app.get('/balancesheet',Trial.BalanceSheet)

    mongoose.connect(a, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {


        console.log('connection successful..');
    }).catch((err) => console.log(err));


app.listen(process.env.PORT || 3000)