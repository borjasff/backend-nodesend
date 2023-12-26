const express = require('express')
const router = express.Router()
const linksController = require('../controllers/linksController')
const filesController = require('../controllers/filesController')
const { check } = require('express-validator')
const auth = require('../middleware/auth')

router.post('/',
    [
        check('name', 'Upload file').not().isEmpty(),
        check('original_name', 'Upload file').not().isEmpty()
    ]
    ,

        auth,
        linksController.newLink
)

router.get('/',
linksController.allLinks
)

router.get('/:url',
linksController.havePassword,
linksController.getLink,

)
router.post('/:url',
    linksController.validatePassword,
    linksController.getLink
)
    module.exports = router