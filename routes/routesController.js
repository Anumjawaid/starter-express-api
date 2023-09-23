var express = require("express");
var routes = express.Router();

var Account = require('../Controller/account')
var Ledger=require('../Controller/ledger')
var Trial=require('../Controller/trial')

const returnRouter = () => {
    routes.get("/",(req,res)=>{ return res.status(200).send({message:"ALL DONE AND RUNNING"})})

    // *******************Account Routes***************************************
    routes.post('/addaccount', Account.Addaccount)
    routes.get('/getaccount', Account.GetAllaccounts)

    // *******************Ledger Routes***************************************

    routes.post("/addledger",Ledger.AddLedger)
    routes.get('/getallledger',Ledger.GetAllLedger)

    // *******************Ledger Routes***************************************

    routes.get('/trialbalance',Trial.TrialBalance)


    return routes
}
module.exports = {
    routes: returnRouter
}