const express = require("express");
const router = express.Router();
const { postLogin, postSignup } = require("../controllers/authControllers");

router.route("/login").post(postLogin);
router.route("/signup").post(postSignup);

module.exports = router;
