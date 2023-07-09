const Products = require("../model/productsSchema");

exports.creatProduct = async (req, res, next) => {
  try {
    const product = await Products.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ erorr: err.message });
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Products.find({});
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(400).send({ erorr: err.message });
  }
};

exports.getOneProduct = async (req, res, next) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      throw new Error("not valid id");
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      throw new Error("not valid id");
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      throw new Error("not valid id");
    }
    res.status(200).json("product is deleted");
  } catch (err) {
    next(err);
  }
};
