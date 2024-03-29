const Auth = require("../models/authModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleError = (err) => {
  return {
    status: "fail",
    message: err.message,
  };
};

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("we need a token");
  } else {
    jwt.verify(token, "super-secret-string", (err, decoded) => {
      if (err) {
        res.json({
          message: "u failed",
        });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

const isAuth = (req, res) => {
  res.send("u are logged in");
};

const getLogin = (req, res) => {
  console.log("login session", req.session.user);
  if (req.session.user) {
    res.send({
      isLoggedIn: true,
      user: req.session.user,
    });
  } else {
    res.send({
      isLoggedIn: false,
      user: null,
    });
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //first find the user with the email entered
    // by using the email, we will get the user data from db having email,password(hashed)
    // and then we can compare the entered password and password from db (hashed)
    const user = await Auth.findOne({ email });

    if (user) {
      // true if entered password and password from db (hashed) matched ,else false
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        // creating a session
        // req.session.user = user;
        // console.log("session", req.session.user);

        const userId = user._id;
        const token = jwt.sign({ id: userId }, "super-secret-string", {
          expiresIn: 300, //5min
        });

        res.status(200).json({
          status: "success login",
          data: user,
          token,
        });
      } else {
        throw new Error("wrong password or email");
      }
    } else {
      throw new Error("no user found");
    }
  } catch (err) {
    // console.log(err);
    const errors = handleError(err);
    res.status(400).json(errors);
  }
};

const postSignup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const newUser = await Auth.create({ email, password, name });
    if (newUser) {
      res.status(200).json({
        status: "success signup",
        data: newUser,
      });
    } else {
      throw new Error("error in signup");
    }
  } catch (err) {
    // console.log(err);
    const errors = handleError(err);
    res.status(400).json(errors);
  }
};

module.exports = {
  postLogin,
  postSignup,
  getLogin,
  isAuth,
  verifyJWT,
};
