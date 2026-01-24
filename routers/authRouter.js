const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const identifier = require("../middlewares/identification");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", identifier, authController.signout);
router.patch(
  "/send-verification-code",
  identifier,
  authController.sendVerificationCode
);
router.patch(
  "/verify-verification-code",
  identifier,
  authController.verifyVerificationCode
);
router.patch(
  "/send-forgot-password-code",
  authController.sendForgetPasswordCode
);
router.patch(
  "/verify-forgot-password-code",
  authController.verifyForgetPasswordCode
);
module.exports = router;
