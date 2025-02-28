const User = require("../Models/user.model");

const userPersonalInformation = async (req, res) => {
     const userId = req.userInfo.id;
     try {
       const user = await User.findById(userId);
       if (!user) {
         return res.status(404).send({
           message: "user is not found!",
           success: false,
         });
       }
       const { name, email,phone,avater } = user;
       return res.status(200).send({
         message: "user info",
         userInfo: { name, email,phone,avater },
         success: true,
       });
     } catch (error) {
       return res.status(500).send({
         message: "somthing broke!",
         success: false,
       });
     }
   };

const avaterUpdate = async (req,res)=>{
     
}

const personalInfoUpdate =async(req,res)=>{

}


module.exports ={
     userPersonalInformation
}