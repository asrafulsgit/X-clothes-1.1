const { v2 : cloudinary } = require('cloudinary') ;
const fs =require('fs')
const User = require("../Models/user.model");
const Address = require("../Models/userAddress.model");


// cloudinary configuration
cloudinary.config({ 
     cloud_name: 'dbpes24kn', 
     api_key: '527739673541715', 
     api_secret: 'VfkJpNPsu5lyhApYock5Hp1sjPY'
 });



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
       const { name, email,phone,avatar } = user;
       return res.status(200).send({
         message: "user info",
         userInfo: { name, email,phone,avatar },
         success: true,
       });
     } catch (error) {
       return res.status(500).send({
         message: "somthing broke!",
         success: false,
       });
     }
};

const avaterUpdate = async (req, res) => {
  try {
    const userId = req.userInfo.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded", success: false });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const result = await cloudinary.uploader.upload(file.path, { resource_type: "image" });

    fs.unlink(file.path, (err) => {
      if (err) console.log(`Failed to delete local file: ${err.message}`);
    });

    user.avatar = result.secure_url;
    await user.save();

    return res.json({ 
      message: "Avatar updated successfully", 
      avatar: user.avatar, 
      success: true 
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

const personalInfoUpdate =async(req,res)=>{

}

const addNewAddress = async(req,res)=>{
    const userId = req.userInfo.id;
    const {house,state,zip,email,phone} = req.body;
    try {
        const isUser = await User.findById(userId)
        if(!isUser){
          return res.status(400).send({
            message : 'user not found . please try again!'
          })
        }
        const newAddress = new Address({
          house,
          state,
          zip,
          email,
          phone
        })
        await newAddress.save();
        return res.status(201).send({
          newAddress,
          message : 'new address added!'
        })
    } catch (error) {
      return res.status(500).send({ message: "somthing broke!" });
    }
}

const getUserAddresses = async(req,res)=>{
    const userId = req.userInfo.id;
    try {
        const isUser = await User.findById(userId)
        if(!isUser){
          return res.status(400).send({
            message : 'user not found . please try again!'
          })
        }
        const addresses = await Address.find({userId})
        return res.status(200).send({
          addresses
        })
    } catch (error) {
      return res.status(500).send({ message: "somthing broke!" });
    }
}

const removeAddress = async(req,res)=>{
    const userId = req.userInfo.id;
    const {addressId} = req.params;
    try {
        const isUser = await User.findById(userId)
        if(!isUser){
          return res.status(400).send({
            message : 'user not found . please try again!'
          })
        }
        const addresses = await Address.findByIdAndDelete(addressId)
        if (addresses.deletedCount === 0) {
          return res.status(404).send({ message: "address not delete!" });
        }
        return res.status(200).send({
          addresses,
          message : 'address is deleted'
        })
    } catch (error) {
      return res.status(500).send({ message: "somthing broke!" });
    }
}

const updateAddress = async(req,res)=>{
  const userId = req.userInfo.id;
  const {addressId} = req.params;
  const {...updatedData} = req.body;

  try {
      const isUser = await User.findById(userId)
      if(!isUser){
        return res.status(400).send({
          message : 'user not found . please try again!'
        })
      }
      const address = await Address.findById(addressId)
      
      if (!address) {
        return res.status(404).send({ message: "address not found!" });
      }
      Object.assign(address,updatedData)
      await address.save();
      return res.status(200).send({
        address,
        message : 'address updated'
      })
  } catch (error) {
    return res.status(500).send({ message: "somthing broke!" });
  }
}

 


module.exports ={
     userPersonalInformation,
     avaterUpdate
}