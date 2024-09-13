const express = require("express");
const app = express();
require("dotenv").config()
const PORT = process.env.PORT || 3000;


const database = require("./config/database")
database.connect();

const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect();


app.use(express.json())
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

const fileUploads = require("./routes/fileUpload")
app.use("/api/v1/upload", fileUploads)


app.listen(PORT, () =>{
    console.log(`app is listening successfully on port no ${PORT}`);
})