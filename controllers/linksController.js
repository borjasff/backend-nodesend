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

    //console.log(req.body)

    //create a new object of link
    const {original_name, name} = req.body

    const link = new Links()
    link.url = shortid.generate()
    link.name = name
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

//get list of all links
exports.allLinks = async  (req, res) => {
    try {
        const links = await Links.find({}).select('url -_id')
        res.json(links)
    } catch (error) {
        console.log(error)
    }
}

//return if link has password or not
exports.havePassword = async (req, res, next) => {
    const {url} = req.params
    //verify link
    const link = await Links.findOne({url})
    if(!link) {
        res.status(404).json({msg: "Link not found"});
        return next()
    }
    if(link.password){
        return res.json({password: true, doc: link.name ,link: link.url})
    }
    next()
}
//validate if the password is valid
exports.validatePassword = async (req, res, next) => {
    console.log(req.body)
    console.log(req.params)
    const {url} = req.params
    const {password} = req.body
    //consult by link
    const link = await Links.findOne({url})
    if(bcrypt.compareSync(password, link.password)){
        //download fiel
        next()
    } else{
        return res.status(401).json({msg: 'Password invalid'})
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
        res.json({ doc: link.name, password: false })

       next()

}