const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors")
const bcrypt = require ("bcryptjs")
const {busmodel} = require ("./models/bus")
const jwt = require ("jsonwebtoken")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://rizna10:rizna2003@cluster0.u7ke2.mongodb.net/busdb?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
    }
    app.post("/signup",async(req,res)=>{
        let input = req.body
        let hashedPassword = await generateHashedPassword(input.pass)
        console.log(hashedPassword)
        input.pass = hashedPassword
        let bus = new busmodel(input)
        bus.save()
    
        res.json({"status":"success"})
    })

app.post("/login",(req,res)=>{
    let input = req.body
    busmodel.find({"emailid":req.body.emailid}).then(
        (response)=>{
            if (response.length>0) {

                let dbpassword = response[0].pass
                console.log(dbpassword)
                bcrypt.compare(input.pass,dbpassword,(error, isMatch)=>{

                    if (isMatch) {

                       jwt.sign({email:input.emailid},"bus-app",{expiresIn:"1d"},
                        (error,token)=>{
                                if (error) {
                                    res.json({"status":"Unable to create token"})
                                    
                                } else {

                                    res.json({"status":"success","userId":response[0]._id,"token":token})
                                    
                                }
                        }
                       )
                        
                    } else {
                        res.json({"status":"incorrect"})
                        
                    }

                })
                
            } else {
                res.json({"status":"User not found"})
            }
        }
    ).catch().finally()
})

app.listen(8080,()=>{
    console.log("Server Started")
})
