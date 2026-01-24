const {
  signupSchema,
  signinSchema,
  accepteCodeShema,
  changePasswordSchema,
  acceptFPCodeShema,
} = require("../middlewares/Validator");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const { doHash, doHashValidation, hmacProcess } = require("../utils/hashing");
const transport = require("../middlewares/sendMail");
exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error, value } = signupSchema.validate({ email, password });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists!" });
    }
    const hashedPassword = await doHash(password, 12);
    const newUser = new User({ email, password: hashedPassword });
    const result = await newUser.save();
    result.password = undefined;
    res.status(201).json({
      success: true,
      message: "Your account has been created succesfully",
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error, value } = signinSchema.validate({ email, password });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    const existingUser = await User.findOne({ email }).select("+password"); //include the field password
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User doesnt exist!" });
    }
    //compare the passwords of the existing password and the one in db

    const result = await doHashValidation(password, existingUser.password); //doHashValidation if two passwords are matched
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Password!" });
    }
    //if the passwords are matched
    const token = jwt.sign(
      { // payload of the jwt
        userId: existingUser._id,
        email: existingUser.email,
        verified: existingUser.verified,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "8h" }
    );
    res.cookie("Authorization", "Bearer " + token, { //the cookie to browser containing the jwt token
        expires: new Date(Date.now() + 8 * 3600000), //cookie expires at
        httpOnly: process.env.NODE_ENV === "production", //if httpOnly = true (based on the condition) then protects cookie from scripts js
        secure: process.env.NODE_ENV === "production", // if secure = true then cookie is only sent over HTTPS
      })
      .json({ //response content that will display
        success: true,
        message: "logged in successfully",
        token,
        verified: existingUser.verified, //  OBLIGATOIRE
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.signout = async (req, res) => {
  res
    .clearCookie("Authorization")
    .status(200)
    .json({ success: true, message: "Logged out Succefully!" });
};

exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User doesnt exist!" });
    }
    if (existingUser.verified) {
      return res
        .status(400)
        .json({ success: false, message: "You are already verified!" });
    }
    const codeValue = Math.floor(Math.random() * 100000).toString();
    let info = await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADRESS,
      to: existingUser.email,
      subject: "verification code",
      html: "<h1>" + codeValue + "</h1>",
    });
    if (info.accepted[0] === existingUser.email) {
      const hashedCodeValue = hmacProcess(
        codeValue,
        process.env.HMAC_VERIFICATION_CODE_SECRET
      );
      existingUser.verificationCode = hashedCodeValue;
      existingUser.verificationCodeValidation = Date.now();
      await existingUser.save();
      return res.status(200).json({ success: true, message: "Code sent!" });
    }
    return res.status(400).json({ success: false, message: "Code Failed!" });
  } catch (error) {
    console.log(error);
  }
};

exports.verifyVerificationCode = async (req, res) => {
  const { email, providedCode } = req.body;
  try {
    const { error, value } = accepteCodeShema.validate({ email, providedCode });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    const codeValue = providedCode.toString();
    const existingUser = await User.findOne({ email }).select(
      "+verificationCode +verificationCodeValidation"
    );
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User doesnt exist!" });
    }
    if (existingUser.verified) {
      return res
        .status(400)
        .json({ success: false, message: "You are already verified!" });
    }
    if (
      !existingUser.verificationCode ||
      !existingUser.verificationCodeValidation
    ) {
      return res.status(400).json({
        success: false,
        message: "Something is wrong with the code !",
      });
    }
    if (Date.now() - existingUser.verificationCodeValidation > 10 * 60 * 1000) {
      return res
        .status(400)
        .json({ success: true, message: "Code has been Expired!" });
    }
    const hashedCodeValue = hmacProcess(
      codeValue,
      process.env.HMAC_VERIFICATION_CODE_SECRET
    );
    if (hashedCodeValue === existingUser.verificationCode) {
      existingUser.verified = true;
      existingUser.verificationCode = undefined;
      existingUser.verificationCodeValidation = undefined;
      await existingUser.save();
      return res.status(200).json({ success: true, message: "Logged in!" });
    }
    return res
      .status(400)
      .json({ success: false, message: "Unexpexted occured!" });
  } catch (error) {
    console.log(error);
  }
};

exports.sendForgetPasswordCode = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User doesnt exist!" });
    }

    const codeValue = Math.floor(Math.random() * 100000).toString();
    let info = await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADRESS,
      to: existingUser.email,
      subject: "Forget Password code",
      html: "<h1>" + codeValue + "</h1>",
    });
    if (info.accepted[0] === existingUser.email) {
      const hashedCodeValue = hmacProcess(
        codeValue,
        process.env.HMAC_VERIFICATION_CODE_SECRET
      );
      existingUser.forgotPasswordCode = hashedCodeValue;
      existingUser.forgotPasswordCodeValidation = Date.now();
      await existingUser.save();
      return res.status(200).json({ success: true, message: "Code sent!" });
    }
    return res.status(500).json({ success: false, message: "Code Failed!" });
  } catch (error) {
    console.log(error);
  }
};

exports.verifyForgetPasswordCode = async (req, res) => {
  const { email, providedCode, newPassword } = req.body;
  try {
    const { error, value } = acceptFPCodeShema.validate({
      email,
      providedCode,
      newPassword,
    });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    const codeValue = providedCode.toString();
    const existingUser = await User.findOne({ email }).select(
      "+forgotPasswordCode +forgotPasswordCodeValidation"
    );
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User doesnt exist!" });
    }
    if (
      !existingUser.forgotPasswordCode ||
      !existingUser.forgotPasswordCodeValidation
    ) {
      return res.status(400).json({
        success: false,
        message: "Something is wrong with the code !",
      });
    }
    if (
      Date.now() - existingUser.forgotPasswordCodeValidation >
      10 * 60 * 1000
    ) {
      return res
        .status(400)
        .json({ success: true, message: "Code has been Expired!" });
    }
    const hashedCodeValue = hmacProcess(
      codeValue,
      process.env.HMAC_VERIFICATION_CODE_SECRET
    );
    if (hashedCodeValue === existingUser.forgotPasswordCode) {
      const hashedPassword = await doHash(newPassword, 12);
      existingUser.password = hashedPassword;
      existingUser.forgotPasswordCode = undefined;
      existingUser.forgotPasswordCodeValidation = undefined;
      await existingUser.save();
      return res
        .status(200)
        .json({ success: true, message: "Password updated!" });
    }
    return res
      .status(400)
      .json({ success: false, message: "Unexpexted occured!" });
  } catch (error) {
    console.log(error);
  }
};
