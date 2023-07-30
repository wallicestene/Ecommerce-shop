const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;
// creating a users model
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
// a salt is a random string of characters that gets added to the users password before it is hashed
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("Please provide both an Email address and Password");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password must include atleast 1 uppercase, lowercase, number and specialCharacter");
  }
  
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }
  // hashing and salting passwords using bcrypt library
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};
//static login method

userSchema.statics.login = async function (email, password) {
    // validation
    if (!email || !password) {
      throw Error("Please provide both an Email address and Password");
    }

    const user = await this.findOne({ email });
  
    if (!user) {
      throw Error("Incorrect Email");
    }
    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error("Incorrect password")
    }
    return user
}

module.exports = mongoose.model("user", userSchema);
