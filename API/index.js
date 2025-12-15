const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: "http://localhost:5173",  
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type"
}));

app.use(express.json());



let dbConnect = require("./dbConnect");

 
const bookSeed = require("./src/Seed/bookSeed");
bookSeed();
const booksRoutes = require("./src/Routes/booksRoutes");
const cartRoutes = require("./src/Routes/cartRoutes");
const checkoutRoutes = require("./src/Routes/checkoutRoutes");

app.use("/images", express.static("./public/images"));

const port = 5050;

app.use("/api/books", booksRoutes);  
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

app.listen(port, () => {
  console.log("server is up");
});