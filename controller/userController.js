const Users = require("../model/userSchema");
const Products = require("../model/productsSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  try {
    const token = jwt.sign(
      { id: req.body._id },
      process.env.WEB_TOKEN_SECRETE_KEY
    );
    const hashPassword = await bcrypt.hash(req.body.password, 12);
    req.body.password = hashPassword;
    const user = await Users.create(req.body);
    res.status(200).json({ data: user, token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      throw new Error("wrong email or password");
    }
    const token = jwt.sign(
      { id: req.body._id },
      process.env.WEB_TOKEN_SECRETE_KEY
    );
    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
};

exports.authentication = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authentication) {
      token = req.headers.authentication.split(" ").at(-1);
    }
    console.log(token);
    if (!token) {
      throw new Error("please login");
    }
    const verification = jwt.verify(token, process.env.WEB_TOKEN_SECRETE_KEY);
    if (!verification) {
      throw new Error("not authenticated");
    }
    next();
  } catch (err) {
    next(err);
  }
};

exports.addProductToUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const user = await Users.findById(userId);
    const product = await Products.findById(productId);
    if (!user) {
      throw new Error("not valid user id ");
    }
    if (!product) {
      throw new Error("not valid product id ");
    }
    let filteredProduct = user.products.find((product) => product == productId);
    if (filteredProduct) {
      throw new Error("you cant add same product more than one time");
    }
    user.products.push(productId);
    user.save();
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await Users.find({});
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).send({ erorr: err.message });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new Error("not valid id");
    }
    res.status(200).json("user is deleted");
  } catch (err) {
    next(err);
  }
};
