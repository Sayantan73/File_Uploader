const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    tags:{
        type: String,
    },
    email:{
        type: String,
    },
    url:{
        type: String,
    }
})

// post middleware
fileSchema.post("save", async (doc) =>{
    try {
        console.log("doc: ", doc);

        // create transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        let info = transporter.sendMail({
            from: `File Uploader`,
            to: doc.email,
            subject: "New file uploaded on cloudinary",
            html: `<h2>Hello, </h2> <p> file uploaded successfully view here: <a href="${doc.url}">${doc.url}</a></p>`
        })

        console.log(info);
        
    } catch (error) {
        console.error(error);
        
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;