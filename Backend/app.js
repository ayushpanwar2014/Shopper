const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Products = require("./routes/Products");
const Users = require("./routes/Users");
const NewCollection = require('./routes/NewCollection');
const PopularInWomen = require('./routes/PopularInWomen');
const Cart = require('./routes/Cart');
const cookieparser = require('cookie-parser');
const morgan = require('morgan');


const app = express();

app.use(express.json());
app.use(cookieparser());

app.use(cors())

app.use(morgan('dev'));

//Database Connection with MongoDB
mongoose.connect("mongodb+srv://ayushpanwar2014:fjAPdR7SMRAkX2Hb@cluster0.orj5n.mongodb.net/Shopper?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("MongoDb Connected!");
});


//API Creation
app.get('/', (req, res) => {
    res.send("Express APP is running");
});

//Image Storage Engine
const Storage = multer.diskStorage({
    destination: "./Upload/Images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }

});

const upload = multer({ storage: Storage });


//Creating Upload Endpoint for images
app.use('/Images', express.static('Upload/Images'));

app.post("/upload", upload.single('product'), (req, res) => {

    res.json({
        success: 1,
        image_url: `http://localhost:8800/images/${req.file.filename}`
    })
});


//Creating Product
app.use('/', Products);

//Creating User
app.use('/', Users);

//creating end point for New Collection
app.use('/', NewCollection);

//creating end point for Popular in Women Category
app.use('/', PopularInWomen);

////creating end point for Add Product in Cart
app.use('/', Cart);

//Server is running
app.listen(8800, (error) => {
    if (!error) {
        console.log("Server is running");
    }
    else {
        console.log(error);
    }
});