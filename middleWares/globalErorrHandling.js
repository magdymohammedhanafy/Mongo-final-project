const erorrHandling = (err, req, res, next) => {
  console.log(err);
  res.status(400).json({ erorr: err.message });
};

module.exports = erorrHandling;
