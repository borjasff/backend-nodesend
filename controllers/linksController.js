const Links = require('../models/Link')
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')

exports.newLink = async (req, res, next) => {
    //check for errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }


    //create a new object of link
    const {original_name} = req.body

    const link = new Links()
    link.url = shortid.generate()
    link.name = shortid.generate()
    link.original_name = original_name

    //if user is authenticated
    if(req.user){
        //take ifno by middleware
        const { password, downloads} = req.body

        //assign number of download of link
        if(downloads){
            link.downloads = downloads
        }
        //assign password
        if(password){
            const salt = await bcrypt.genSalt(10)
            link.password = await bcrypt.hash(password, salt)
        }
        //assign author
        link.author = req.user.id
    }

    //save in db
    try {
        await link.save()
        res.json({msg: `${link.url}`})
        next()
    } catch (error) {
        console.log(error)
    }
}

//get link
exports.getLink = async (req, res, next) => {

        const {url} = req.params
        //verify link
        const link = await Links.findOne({url})
        if(!link) {
            res.status(404).json({msg: "Link not found"});
            return next()
        }

        //if link exists
        res.json({doc: link.name})

        //if downloads are same as 1 - remove link and file
        const { downloads, name, _id} = link;
        
        if(downloads === 1){
            console.log("1")
            //remove doc
            req.doc = name;
           
            //remove entry of db
            await Links.findOneAndDelete(_id)
            
            next()
        } else {

            //if download are greater than 1 - rest 1
            link.downloads--;
            await link.save()
        }
}