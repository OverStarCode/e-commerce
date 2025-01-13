
require("dotenv").config();
const express = require("express");

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");
const authRoutes = require("./routes/auth");

const port = process.env.PORT || 3030

const app = express();

app.use(cookieParser());


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cors());



// app.use("/api/auth",require("./routes/auth"))
app.use("/api/auth", authRoutes);

app.use("/api/db",require("./routes/dbConfig"))
app.use("/api/products", require("./routes/product"))
app.use("/api/baskets",require("./routes/basket"));





    
app.listen(port , (err, res) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
});