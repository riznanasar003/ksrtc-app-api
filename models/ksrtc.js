const mongoose = require ("mongoose")
const schema = mongoose.Schema(
    {
        "bname":{type:String,required:true},
        "broute":{type:String,required:true},
        "bno":{type:String,required:true},
        "driver":{type:String,required:true}
        
    }
)

const ksrtcmodel = mongoose.model("buses",schema);
module.exports = {ksrtcmodel}