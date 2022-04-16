const User = require("../models/user");
const Token = require("../models/token");
const sendEmail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

module.exports.register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.login = async (req, res) => {
  const { email, pwd } = req.body;
  try {
    const user = await User.login(email, pwd);
    const token = createToken(user);
    res.cookie("auth", token, { httpOnly: true, maxAge: 24 * 60 * 60 });
    res.status(200).json({ user: user, token: token });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.logout = (req, res) => {
  res.cookie("auth", "", { maxAge: 1 });
  res.status(200).json();
};

module.exports.forgot = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ error: "user with given email doesn't exist" });
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);
    res
      .status(200)
      .json({ error: "password reset link sent to your email account" });
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }
};

module.exports.resetPwd = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");
    user.pwd = req.body.pwd;
    await user.save();
    await token.delete();
    res.status(201).json("password reset sucessfully.");
  } catch (error) {
    res.status(500).json("An error occured");
  }
};
