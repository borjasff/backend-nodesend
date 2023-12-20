const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');


exports.uploadFile = async (req, res, next) => {

    const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'/../uploads')
        },
        filename: (req, file, cb) => {
            const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            cb(null, `${shortid.generate()}${extension}` );
        }
    })

        const configMulter = {
            limits : { fileSize : req.user ? 1024 * 1024 * 10 : 1024 * 1024 },
            storage: fileStorage,
        }

//store
const upload = multer(configMulter).single('doc');

    upload( req, res, async (error) => {
    console.log(req.file)
    
    if(!error){
        res.json({doc: req.file.filename})
    } else{
        console.log(error)
        return next()
    }
    })
}    


exports.removeFile = async (req, res) => {
    console.log(req.doc)

    try{
        fs.unlinkSync(__dirname + `/../uploads/${req.doc}`)
        console.log("File removed successfully")
    } catch(error){
        console.log(error)
    }
    
}