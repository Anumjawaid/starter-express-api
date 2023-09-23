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
            { Debit: asset[asset.length - 1].Debit, Credit: asset[asset.length - 1].Credit },
            { Debit: equity[equity.length - 1].Debit, Credit: equity[equity.length - 1].Credit },
            { Debit: expense[expense.length - 1].Debit, Credit: expense[expense.length - 1].Credit },
            { Debit: reven[reven.length - 1].Debit, Credit: reven[reven.length - 1].Credit },
            { Debit: liabi[liabi.length - 1].Debit, Credit: liabi[liabi.length - 1].Credit },

        ])


        res.status(200).send({
            "message": "Trial Balance ",
            data: [{ "Asset": [...asset] }, { "Equity": [...equity] }, { "Expense": [...expense] }, { "Revenue": [...reven] }, { "Liability": [...liabi] },{"GrandTotal":[gr]}]
        })

    }
    catch (e) {
        console.log(e, "error")
        res.status(400).send({ message: "Unable to Fetch Results", data: e })
    }
}

function GrandTotal(arr) {
    // arr[{Type:"",Account:"Asset",D:"",C:"",Bal:""}]

    let tot_deb = 0, tot_cred = 0
    arr.map((v, i) => {
        tot_deb += v.Debit
        tot_cred += v.Credit
    })
    return  { Debit: tot_deb, Credit: tot_cred } 
}