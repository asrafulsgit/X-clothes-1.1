const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../Models/user.model");

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isExist = await User.findOne({ email });
    if (isExist) {
    return res.status(400).send({errors : [{
        message: "email is already exist!",
        field: "email",
      }]});
    } 
    if (password.length < 6) {
    return res.status(400).send({
        message: "Password must be 6 digit!",
        field: "password",
      });
    }
    
      const hash = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hash,
      });
      await newUser.save();
    return  res.status(201).send({success : true, message: "Register completed" });
    
  } catch (error) {
    return  res.status(500).send({
      message: "somthing broke!",
      field: "server",
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isExist = await User.findOne({ email });
    if (!isExist) {
      return res.status(404).send({ errors :[{
        message: "email is not valid!",
        field: "email",
      }]});
    }

    const existedUser = await bcrypt.compare(password, isExist.password);
    if (!existedUser) {
      return res.status(404).send(
        { success: false, 
          errors :[{
          message: "wrong password!",
          field: "password",
        }]});
    }
    const accessToken = jwt.sign(
      {
        id: isExist._id, role : isExist.role
      },
      process.env.JWT_ACCESS_TOEKN,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      {
        id: isExist._id, role : isExist.role
      },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    isExist.refreshtoken = refreshToken;
    await isExist.save();

    res.cookie("accesstoken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 15,
    });
    res.cookie("refreshtoken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(200).send({
      message: "logged in success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "somthing broke!",
      field: "server",
      success: false,
    });
  }
};

const tokenRefresh = async (req, res) => {
  const { accesstoken, refreshtoken } = req.cookies;
  try {
    if (accesstoken) {
      return res.status(200).send({
        message: "authorized user",
        isAuth: true,
      });
    }
    if (!accesstoken && refreshtoken) {
      try {
        const decodeRefreshToken = jwt.verify(
          refreshtoken,
          process.env.JWT_REFRESH_TOKEN
        );
        const user = await User.findById(decodeRefreshToken.id);
        if (!user || user.refreshtoken !== refreshtoken) {
          return res.status(401).send({
            message: "unauthorized user",
            isAuth: false,
          });
        }
        const newAccessToken = jwt.sign(
          {
            id: user._id,
            role : user.role
          },
          process.env.JWT_ACCESS_TOEKN,
          { expiresIn: "15m" }
        );

        res.cookie("accesstoken", newAccessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "Strict",
          maxAge: 1000 * 60 * 15,
        });
        return res.status(200).send({
          message: "authorized user",
          isAuth: true,
        });
      } catch (error) {
        return res.status(404).send({
          message: "refresh token is not found",
          isAuth: false,
        });
      }
    }
    return res.status(404).send({
      message: "token is not found",
      isAuth: false,
    });
  } catch (error) {
    return res.status(500).send({
      message: "something broke!",
      isAuth: false,
    });
  }
};

const getAdminAuthentication=async(req,res)=>{
    const adminId = req.adminInfo.id;
    const adminRole = req.adminInfo.role;
    try {
      const isAdmin = await User.findById(adminId)
      if(!isAdmin){
        return res.status(404).send({
          success : false,
          message : 'admin not found!'
        })
      }
      if(adminRole !== isAdmin.role){
        return res.status(400).send({
          success : false,
          message : 'unauthorize admin!'
        })
      }
      return res.status(200).send({
        success : true,
        message : 'authenticated admin'
      })
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "something broke!"
      });
    }
}



const userLogout = async (req, res) => {
  const { refreshtoken } = req.cookies;
  const userId = req.userInfo.id;
  try {
    if (!refreshtoken) {
      return res.status(401).send({
        message: "user allready logged out",
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        message: "user is not found",
      });
    }

    user.refreshtoken = null;
    await user.save();
    res.clearCookie("accesstoken", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    res.clearCookie("refreshtoken", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    return res.status(200).send({
      message: "user logout successful",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "somthing broke!",
      success: false,
    });
  }
};

// forgot-password
const findUserAndSendEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success : false,
        errors : [{ message: "user is not found!" }]
      });
    }

    const createVerificationCode = Math.floor(100000 + Math.random() * 900000);
    const hashCode = await bcrypt.hash(createVerificationCode.toString(), 10);
    user.resetpasswordcode = hashCode;
    user.resetpasswordexpiries = Date.now() + 60000; // 1min
    await user.save();

    // send mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Reset password",
      text: `your reset password code is ${createVerificationCode}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }

      return res.status(200).send({
        message: "Verification code is sent",
        email,
      });
    });
  } catch (error) {
    return res.status(500).send({ message: "somthing broke!" });
  }
};
const EmailVerification = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send( {
          success : false,
          errors : [{ message: "user is not found!" }]
      });
    }
    if (Date.now() > user.resetpasswordexpiries) {
      return res.status(404).send( {
        success : false,
        errors :[{ message: "this code is expired!" }]
      });
    }
    const isVerified = await bcrypt.compare(code, user.resetpasswordcode);
    if (!isVerified) {
      return res.status(404).send({
        success : false,
        errors : [{ message: "Code is not match!" }]
      });
    }

    return res.status(200).send({
      success: true,
      message: "verification is complited"
    });
  } catch (error) {
    return res.status(500).send({
      success : false,
      field : 'server',
      errors :[{ message: "somthing broke!" }]
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { email, code, password, rePassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, errors: [{ message: "Email not found!" }] });
    }

    if (password !== rePassword) {
      return res.status(400).send({ success: false, errors: [{ message: "Passwords do not match!" }] });
    }

    if (!user.resetpasswordcode || !user.resetpasswordexpiries || Date.now() > user.resetpasswordexpiries) {
      return res.status(400).send({ success: false, errors: [{ message: "Your verification code has expired. Please try again!" }] });
    }

    const isCodeValid = await bcrypt.compare(code, user.resetpasswordcode);
    if (!isCodeValid) {
      return res.status(400).send({ success: false, errors: [{ message: "Invalid verification code!" }] });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetpasswordcode = null; 
    user.resetpasswordexpiries = null; 
    await user.save();

    return res.status(200).send({ success: true, message: "Password has been successfully reset." });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      field: 'server',
      errors: [{ message: "Something broke!" }]
    });
  }
};


module.exports = {
  userRegister,
  userLogin,
  findUserAndSendEmail,
  EmailVerification,
  resetPassword,
  tokenRefresh,
  userLogout,
  getAdminAuthentication
};
