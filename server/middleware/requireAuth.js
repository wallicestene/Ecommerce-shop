const jwt = require("jsonwebtoken");
const User = require("../models/UsersModel")
const requireAuth = async (req, res, next) => {
  // verifying authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({_id}).select("_id")

    next()

  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "Forbidden" });
  }
};
module.exports = requireAuth
