const Blog = require('./Blog')
const fs = require('fs')
const path = require('path')

const setNewBlog = async(req, res)=>{
    if(req.file &&
        req.body.title.length > 2 &&
        req.body.category.length > 2 &&
        req.body.description.length > 2 
    ){
        new Blog({
            title: req.body.title,
            category: req.body.category,
            image: `/images/blogs/${req.file.filename}`,
            description: req.body.description,
            author:req.user._id
        }).save()
        res.redirect(`/my-blogs/${req.user._id}`)
    }else{
        res.redirect('/new-blog?error=1')
    }
}

const editBlog = async (req, res)=>{
    if(req.file &&
        req.body.title.length > 2 &&
        req.body.category.length > 2 &&
        req.body.description.length > 2
    ){
        const blogs = await Blog.findById(req.body.id)
        fs.unlinkSync(path.join(__dirname + '../../../public' + blogs.image))
        await Blog.findByIdAndUpdate(req.body.id, {
            title: req.body.title,
            category: req.body.category,
            image: `/images/blogs/${req.file.filename}`,
            description: req.body.description,
            author:req.user.id
        })
        res.redirect('/my-blogs/' + req.user._id)
    }else{
        res.redirect(`/edit/${req.body.id}?error=1`)
    }
}

const deleteBlog = async (req, res)=>{
    const blog = await Blog.findById(req.params.id)
    if(blog){
        fs.unlinkSync(path.join(__dirname + '../../../public' + blog.image))
        await Blog.deleteOne({_id: req.params.id})
        res.status(200).send('ok')
    }else{
        res.status(404).send('Not Found')
    }
}

module.exports = {
    setNewBlog,
    editBlog,
    deleteBlog
}
