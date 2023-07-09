const express = require("express");
const globalErorrHandling = require("./middleWares/globalErorrHandling");
const productsRoute = require("./routes/productsRoute");
const UsersRoute = require("./routes/usersRoute");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: ".env" });
const mongoose = require("mongoose");
const { json } = require("body-parser");

//connection to data base
const dbConnection = () => {
  mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).then((conn) => {
    console.log("connection successed with data base");
    console.log(conn.connection.host);
  });
};
dbConnection();

//express app
const app = express();

//express global middle wares
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/products", productsRoute);
app.use("/users", UsersRoute);

//global erorr handling
app.use(globalErorrHandling);

//express listening
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log("server running at http://localhost:3000");
});
