let Ledger = require('../Controller/ledger')

exports.TrialBalance = async (req, res) => {
    try {
        // Get Asset Calculate Balance
        let asset = await Ledger.GetSpecificLedger({ 'data': { type: "Asset" } })
        let equity = await Ledger.GetSpecificLedger({ 'data': { type: "Equity" } })
        let expense = await Ledger.GetSpecificLedger({ 'data': { type: "Expense" } })
        let reven = await Ledger.GetSpecificLedger({ 'data': { type: "Revenue" } })
        let liabi = await Ledger.GetSpecificLedger({ 'data': { type: "Liability" } })
        let gr = GrandTotal([
            asset.length != 0 ? { Debit: asset[asset.length - 1]["Debit"], Credit: asset[asset.length - 1]["Credit"] } : { Debit: 0, Credit: 0 },
            equity.length != 0 ? { Debit: equity[equity.length - 1].Debit, Credit: equity[equity.length - 1].Credit } : { Debit: 0, Credit: 0 },
            expense.length != 0 ? { Debit: expense[expense.length - 1].Debit, Credit: expense[expense.length - 1].Credit } : { Debit: 0, Credit: 0 },
            reven.length != 0 ? { Debit: reven[reven.length - 1].Debit, Credit: reven[reven.length - 1].Credit } : { Debit: 0, Credit: 0 },
            liabi.length != 0 ? { Debit: liabi[liabi.length - 1].Debit, Credit: liabi[liabi.length - 1].Credit } : { Debit: 0, Credit: 0 },

        ])


        res.status(200).send({
            "message": "Trial Balance ",
            data: [{ "Asset": [...asset] }, { "Equity": [...equity] }, { "Expense": [...expense] }, { "Revenue": [...reven] }, { "Liability": [...liabi] }, { "GrandTotal": [gr] }]
        })

    }
    catch (e) {
        console.log(e, "error")
        res.status(400).send({ message: "Unable to Fetch Results", data: e })
    }
}


exports.IncomeStatment = async (req, res) => {
    try {
        let expense = await Ledger.GetSpecificLedger({ 'data': { type: "Expense" } })
        let reven = await Ledger.GetSpecificLedger({ 'data': { type: "Revenue" } })
        let gr = GrandTotal([
            expense.length != 0 ? { Debit: expense[expense.length - 1].Debit, Credit: expense[expense.length - 1].Credit } : { Debit: 0, Credit: 0 },
            reven.length != 0 ? { Debit: reven[reven.length - 1].Debit, Credit: reven[reven.length - 1].Credit } : { Debit: 0, Credit: 0 },
        ])
        res.status(200).send({
            "message": "Income Statement ",
            data: [{ "Expense": [...expense] }, { "Revenue": [...reven] }, { "Net Loss": [gr] }]
        })

    }
    catch (e) {

    }

}

exports.BalanceSheet=async(req,res)=>{
    try{
        let asset = await Ledger.GetSpecificLedger({ 'data': { type: "Asset" } })
        let equity = await Ledger.GetSpecificLedger({ 'data': { type: "Equity" } })
       
        let liabi = await Ledger.GetSpecificLedger({ 'data': { type: "Liability" } })
        let gr = GrandTotal([
            asset.length != 0 ? { Debit: asset[asset.length - 1]["Debit"], Credit: asset[asset.length - 1]["Credit"] } : { Debit: 0, Credit: 0 },
            equity.length != 0 ? { Debit: equity[equity.length - 1].Debit, Credit: equity[equity.length - 1].Credit } : { Debit: 0, Credit: 0 },
            liabi.length != 0 ? { Debit: liabi[liabi.length - 1].Debit, Credit: liabi[liabi.length - 1].Credit } : { Debit: 0, Credit: 0 },

        ])


        res.status(200).send({
            "message": "Balance Sheet ",
            data: [{ "Asset": [...asset] }, { "Equity": [...equity] }, { "Expense": [...expense] }, { "Revenue": [...reven] }, { "Liability": [...liabi] }, { "Retained Earnings": [gr] }]
        })

    }
    catch(e){

    }
}

function GrandTotal(arr) {
    // arr[{Type:"",Account:"Asset",D:"",C:"",Bal:""}]

    let tot_deb = 0, tot_cred = 0
    arr.map((v, i) => {
        tot_deb += v.Debit
        tot_cred += v.Credit
    })
    return { Debit: tot_deb, Credit: tot_cred }
}