const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: Object,
      required: true,
    },
    sexe: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      validate: [isEmail, "Entrez un email valide"],
    },
    pwd: {
      type: String,
      minlength: [
        8,
        "Votre mot de passe doit contenir 8 caractères au minimum",
      ],
      required: [true, "Veuillez saisir un mot de passe"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.pwd = await bcrypt.hash(this.pwd, salt);
  next();
});

userSchema.statics.login = async function (email, pwd) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(pwd, user.pwd);
    if (auth) {
      return user;
    }
    throw Error("pwd error");
  }
  throw Error("user error");
};

module.exports = mongoose.model("User", userSchema);
