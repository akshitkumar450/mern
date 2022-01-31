const express = require("express");
const router = express.Router();
const {
  postLogin,
  postSignup,
  getLogin,
} = require("../controllers/authControllers");

router.route("/login").get(getLogin).post(postLogin);
router.route("/signup").post(postSignup);

module.exports = router;
