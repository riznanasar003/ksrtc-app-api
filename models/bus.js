const mongoose = require ("mongoose")
const schema = mongoose.Schema(
    {
        "name":{type:String,required:true},
        "emailid":{type:String,required:true},
        "phone":{type:String,required:true},
        "gender":{type:String,required:true},
        "pass":{type:String,required:true}
        
    }
)

const busmodel = mongoose.model("users",schema);
module.exports = {busmodel}