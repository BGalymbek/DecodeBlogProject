const express = require('express')
const router = express.Router();
const upload = require('./multer')
const {setNewBlog, editBlog, deleteBlog} = require('./controller')
const {isAuth, isAuthAdminOrAuthor, isAuthAuthor} = require('../auth/middlewares') 
 
router.post('/api/new-blog', isAuth, upload.single('image'), setNewBlog)
router.post('/api/edit-blog/:id', isAuthAdminOrAuthor, upload.single('image'), editBlog)
router.delete('/api/blogs/:id', isAuthAdminOrAuthor, deleteBlog)
router.get(`/editOrDelete/:id`, isAuthAuthor, (req, res)=>{
    res.send('ok')
})

module.exports = router