const File = require("../models/File");
const cloudinary = require("cloudinary").v2


exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log("here is your file: ",file);
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`
        console.log("path: ",path);
        
        file.mv(path, (error)=>{
            console.log(error);
            
        })
        res.json({
            success: true,
            message: "Local file uploaded successfully"
        })
        
    } catch (error) {
        console.log(error);
    }
}

function isFileTypeSupported (type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary (file, folder, quality){
    const options = {folder};
    if (quality) {
        options.quality = quality
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

// image upload handeller
exports.imageUpload = async (req, res) =>{
    try {
        // fetch data
        const {name, tags, email} = req.body;
        console.log("name, tags, email", name, tags, email);
        
        const file = req.files.imageFile;
        console.log("file: ", file);
        
        // validation 
        const supportedTypes = ["jpeg", "jpg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("filetype: ", fileType);
        

        if(!isFileTypeSupported(fileType, supportedTypes)){
            res.status(400).json({success: false, message: "filetype not supported"})
        }

        // file format supported and upload to cloudinary
        const response = await uploadFileToCloudinary(file, "fileUploadProject")
        console.log("response: ", response);
        

        // save entry to db
        const fileData = await File.create({name, tags, email, url: response.secure_url})

        res.status(200).json({
            success: true,
            message: "image successfully uploaded",
            imageUrl: response.secure_url,
            data: fileData
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.videoUpload = async (req, res) =>{
    try {
        // fetch data
        const {name, tags, email} = req.body;
        console.log("name, tags, email", name, tags, email);

        const file = req.files.videoFile;
        console.log("file: ", file);

        // validation 
        const supportedTypes = ["mp4", "mkv"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("filetype: ", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            res.status(400).json({success: false, message: "filetype not supported"})
        }

        // file format supported and upload to cloudinary
        const response = await uploadFileToCloudinary(file, "fileUploadProject")
        console.log("response: ", response);
        

        // save entry to db
        const fileData = await File.create({name, tags, email, url: response.secure_url})

        res.status(200).json({
            success: true,
            message: "video successfully uploaded",
            videoUrl: response.secure_url,
            data: fileData
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.imageSizeReducer = async (req, res) => {
    try {
        // fetch data
        const {name, tags, email} = req.body;
        console.log("name, tags, email", name, tags, email);
        
        const file = req.files.imageFile;
        console.log("file: ", file);
        
        // validation 
        const supportedTypes = ["jpeg", "jpg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("filetype: ", fileType);
        

        if(!isFileTypeSupported(fileType, supportedTypes)){
            res.status(400).json({success: false, message: "filetype not supported"})
        }

        // file format supported and upload to cloudinary
        const response = await uploadFileToCloudinary(file, "fileUploadProject", 20)
        console.log("response: ", response);
        

        // save entry to db
        const fileData = await File.create({name, tags, email, url: response.secure_url})

        res.status(200).json({
            success: true,
            message: "image successfully compressed and uploaded",
            imageUrl: response.secure_url,
            data: fileData
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}