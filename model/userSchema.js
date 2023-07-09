const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name is requires"],
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: [true, "email must be unique"],
  },
  password: {
    type: String,
    required: [true, "email required"],
  },
  products: {
    type: Array,
  },
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
