const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../Models/user.model");

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isExist = await User.findOne({ email });
    if (isExist) {
      res.status(400).send({
        message: "email is already exist!",
        field: "email",
      });
    } else if (password.length < 6) {
      res.status(400).send({
        message: "Password must be 6 digit!",
        field: "password",
      });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hash,
      });
      await newUser.save();
      res.status(201).send({ message: "Register completed" });
    }
  } catch (error) {
    res.status(500).send({
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
      return res.status(404).send({
        message: "email is not valid!",
        field: "email",
      });
    }

    if (password.length < 6) {
      return res.status(404).send({
        message: "Password must be 6 digit!",
        field: "password",
      });
    }
    const existedUser = await bcrypt.compare(password, isExist.password);
    if (!existedUser) {
      return res.status(404).send({
        message: "wrong password!",
        field: "password",
      });
    }
    const accessToken = jwt.sign(
      {
        id: isExist._id,
      },
      process.env.JWT_ACCESS_TOEKN,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      {
        id: isExist._id,
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

const userProfile = async (req, res) => {
  const userId = req.userInfo.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        message: "user is not found!",
        success: false,
      });
    }
    const { name, email } = user;
    return res.status(200).send({
      message: "user info",
      userInfo: { name, email },
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "somthing broke!",
      success: false,
    });
  }
};

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
      return res.status(404).send({ message: "user is not found!" });
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
      return res.status(404).send({ message: "user is not found!" });
    }
    if (Date.now() > user.resetpasswordexpiries) {
      return res.status(404).send({ message: "this code is expired!" });
    }
    const isVerified = await bcrypt.compare(code, user.resetpasswordcode);
    if (!isVerified) {
      return res.status(404).send({ message: "Code is not match!" });
    }

    return res.status(200).send({
      message: "verification is complited",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({ message: "somthing broke!" });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { email, code, password, rePassword } = req.body;
    console.log(email, typeof code, password, rePassword);
    const user = await User.findOne({ email });
    if (!user) {
     return res.status(404).send({ message: "email is not found!" });
     }
    if(password !== rePassword){
     return res.status(404).send({ message: "Password is not match!" });
    }
    const verificationCode = user.resetpasswordcode;
    const verifyCode = await bcrypt.compare(code,verificationCode)
    if(!verifyCode){
     return res.status(404).send({ message: "your verfication is timeout . please try again!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetpasswordcode = '';
    user.resetpasswordexpiries = '';
    await user.save();
    res.status(200).send({ message: "password is successfully reset" });
  } catch (error) {
    res.status(500).send({ message: "somthing broke!" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  userProfile,
  findUserAndSendEmail,
  EmailVerification,
  resetPassword,
  tokenRefresh,
  userLogout,
};
