const express = require('express')
const router = express.Router();
const upload = require('./multer')
const {setNewBlog, editBlog} = require('./controller')
const {isAuth, isAuthEdit} = require('../auth/middlewares') 

router.post('/api/new-blog', isAuth , upload.single('image'), setNewBlog)
router.post('/api/edit-blog', isAuth, upload.single('image'), editBlog)

module.exports = router