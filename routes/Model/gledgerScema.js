var mongoose=require('mongoose')

var Schema=mongoose.Schema;

var ledgerSchema=new Schema(
    {
        AccountName:{
            type: String,
        },
        Type:{
            type:String
        },
        Date:{
            type:Date
        },
        Voucherno:{
            type:String
        },
        Credit:{
            type:Number
        },
        Debit:{
            type:Number
        },
        Remarks:{
            type:String
        }

    }
)

module.exports=mongoose.model('GLedger',ledgerSchema)