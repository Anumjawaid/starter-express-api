var Ledger = require('../Model/gledgerScema')


exports.AddLedger = async (req, res) => {
    try {
        const { date, credit, debit, voucherno, account, type, remarks } = req.body.data
        console.log("values---", date, credit, debit, voucherno, account, type, remarks)
        let addLed = new Ledger({
            AccountName: account,
            Type: type,
            Date: date,
            Voucherno: voucherno,
            Credit: credit,
            Debit: debit,
            Remarks: remarks

        })
        addLed.save()
        res.status(200).send({ message: "Succesfully Added", data: addLed })
    }
    catch (e) {
        res.status(400).send({ message: "Unable to Add Results", data: e })
    }

}


exports.GetAllLedger = async (req, res) => {
    try {
        const { date, credit, debit, voucherno, account, type, remarks } = req.body
        let addLed = await Ledger.find()
        res.status(200).send({ message: "Succesfully Added", data: addLed })
    }
    catch (e) {
        res.status(400).send({ message: "Unable to Fetch Results", data: e })
    }

}


exports.GetSpecificLedger = async (props) => {
    console.log(props, "props")
    let total = []

    try {
        // console.log(props, "props")
        let addLed = await Ledger.find({ "Type": props.data.type })
        // console.log(addLed, "led")
        let Tr = Transform(addLed)

        return Tr
        // res.status(200).send({ message: "Succesfully Added", data: addLed })
    }
    catch (e) {
        // res.status(400).send({message: "Unable to Fetch Results", data: e})
        // console.log(props, "type in error")
        return { "message": e }
    }
}

function Transform(arr) {
    let main = []

    if (arr.length == 0) {
        return main
    }
    else {
        let dv = 0, cv = 0
        let type = arr[0].Type
        arr.map((v, i) => {
            dv += v.Debit
            cv += v.Credit
            main.push({ Type: v.Type, Account: v.AccountName, Debit: v.Debit, Credit: v.Credit, Balance: v.Debit - v.Credit })
        })
        if (arr.length == main.length) {
            main.push({ Type: type, Account: "", Debit: dv, Credit: cv, Balance: dv - cv })
            // console.log(main, "main")
            return main

        }
    }

}