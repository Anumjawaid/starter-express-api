var mongoose=require('mongoose')

var Schema=mongoose.Schema;

var accountSchema=new Schema(
    {
        AccountName:{
            type: String,
        },
        Type:{
            type:String
        },
        updated:{ttype:Date,default:Date.now},
        created:{ttype:Date,default:Date.now}
    }
)

module.exports=mongoose.model('Account',accountSchema)