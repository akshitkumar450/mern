const express = require("express");
const router = express.Router();
const {
  postLogin,
  postSignup,
  getLogin,
  isAuth,
  verifyJWT,
} = require("../controllers/authControllers");

router.route("/login").get(getLogin).post(postLogin);
router.route("/signup").post(postSignup);
router.route("/isUserAuth").get(verifyJWT, isAuth);

module.exports = router;
