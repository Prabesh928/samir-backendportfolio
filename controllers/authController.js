const loginmodel = require('../models/login.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let express= require('express')
let app = express();
app.use(express.json())

exports.createuser = async (req,res)=>{
    
    const Email = process.env.ADMIN_EMAIL;
    const Password = process.env.ADMIN_PASSWORD;
   
    

     const hashedpassword = await bcrypt.hash(Password,10);
     let logindata = new loginmodel({
        email:Email,
        password:hashedpassword
    })
    await logindata.save().then(()=>{
       return res.json({message:"user data saved"})
    }).catch((error)=>{
        console.log(error);
        return res.status(500).json({ error: "Failed to save user data" });
    })


}

exports.login = async (req,res)=>{

    let{email,password}=req.body;
    console.log(email);
    console.log(password);

    if(!email || !password){
        return res.json({status:false, message:"please enter email or password"});
    }
    try{
        const user =await loginmodel.findOne({email});
        if(!user){
          return res.json({
            status:false, message:"please enter valid credentials email"
           })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if(!isMatch){
           return res.json({status:false,message:"please enter valid credentials password"})
        }
       
        const token = jwt.sign(
            {id:user._id,email:user.email},
            process.env.JWT_SEC,
            { expiresIn: '1h' }  

        )
       
        res.cookie('token', token, {
        httpOnly: true, 
        secure: true, 
        sameSite: 'None',     
         maxAge: 60 * 60 * 1000,  
                 
         
        })

      return  res.json({message:"login sucessfully",token:token});

    }
    catch(error){
      return  res.json({message:"erro"})

    }
}

exports.logout =  (req, res) => {
  res.clearCookie('token'); // or cookie name you use
  res.status(200).send({ message: 'Logged out' });
}

exports.verification =async(req,res)=>{
  console.log("api hit")
    try{
        res.json({islogin:true})
    }
    catch(error){
        res.json({islogin:false})
    }
}

