var mongoose=require('mongoose')

var Schema=mongoose.Schema;

var accountSchema=new Schema(
    {
        AccountName:{
            type: String,
        },
        Type:{
            type:String
        }
    }
)

module.exports=mongoose.model('Account',accountSchema)