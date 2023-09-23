var Account = require('../Model/accountSchema')

exports.Addaccount = async (req, res) => {
    try {
        let { account, type } = req.body.data
        var addaccount = new Account({
            AccountName: account,
            Type: type
        })
        await addaccount.save()
        return res.status(200).send({message:"Added",data: addaccount})
    }
    catch (ex) {
        res.status(500).send({message:"Error from Account",data: ex})
    }

}

exports.GetAllaccounts = async (req, res) => {
    try {
        let acc=await Account.find()
        console.log(acc,"Accounts")
        return res.status(200).send({message:"Added", data:acc})
    }
    catch (ex) {
        res.status(500).send({message:"Unable to Fetch Accounts", data:ex})
    }

}

