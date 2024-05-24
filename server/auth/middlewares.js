const Blog = require('../Blog/Blog')

const isAuth = (req, res , next) =>{
    if(req.user){
        next()
    }else{
        res.status(401).send('Unauthorized')
    }
}

const isAuthAdminOrAuthor = async (req, res, next)=>{
    const blogAuthor = await Blog.findById(req.params.id)
    if(req.user.id == blogAuthor.author || req.user.isAdmin){
        next()
    }else{
        res.status(401).send('You can not edit and delete this Blog. Only admin and author!')
    }
}

const isAuthAuthor = async (req, res, next)=>{
    if(req.user.id == req.params.id){
        next()
    }else{
        res.status(401).send('You can not edit and delete this Blog. Only author!')
    }
}

module.exports = {isAuth , isAuthAdminOrAuthor, isAuthAuthor}