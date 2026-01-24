const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token;
  if (req.headers.client === "not-browser") { //If the request is from a mobile app or Postman
    //It will send token in headers
    token = req.headers.authorization;
  } else { //If the request is from browser
    //It reads the token from cookies we define and sent to browser
    token = req.cookies["Authorization"];
  }
  if (!token) { //if theres no token(empty) deny access (he hasnt logg yet)
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const userToken = token.split(" ")[1]; //get the token(authorization) since we have Bearer TOKEN
    const jwtVerified = jwt.verify(userToken, process.env.TOKEN_SECRET); //verify the signature new and the signature of the token
    if (jwtVerified) { //after verification we return the payload(user info)
      req.user = jwtVerified;  //store  it in req.user
      next();
    } else {
      throw new Error("error in the token");
    }
  } catch (error) { //if it didnt match signature throw error
    console.log(error);
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};
