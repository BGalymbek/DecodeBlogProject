const express = require('express')
const router = express.Router();
const Category = require('../Category/Category')
const User = require('../auth/User')
const Blog = require('../Blog/Blog')
const Rate = require('../Rates/Rates')

router.get('/' , async (req, res)=>{
    const options = {}
    const categories = await Category.findOne({key:req.query.categ})
    if(categories){
        options.category = categories._id
        res.locals.category = req.query.categ
    }
    let page = 0
    const limit = 3
    if(req.query && req.query.page){
        page = req.query.page
    }
    if(req.query.search && req.query.search.length > 0){
        options.$or = [
            {
                title: new RegExp(req.query.search , 'i')
            }
        ]
        res.locals.search = req.query.search
    }
    const totalBlogs = await Blog.countDocuments(options)
    const allCategories = await Category.find()
    const blogs = await Blog.find(options).limit(limit).skip(page * limit).populate('category').populate('author')
    const rates = await Rate.find().populate('authorId')
    const user = req.user ? await User.findById(req.user._id) : {}
    res.render('index', {user: user, blogs: blogs, categories: allCategories, pages: Math.ceil(totalBlogs / limit), rates: rates})
})

router.get('/my-blogs/:id' , async(req, res)=>{
    const user = await User.findById(req.params.id)
    const blogs = await Blog.find().populate('category').populate('author')
    const rates = await Rate.find().populate('authorId')
    res.render('my-blogs', {user: user ,loginUser:req.user, blogs: blogs, rates: rates})
})

router.get('/admin/:id' , async(req, res)=>{
    const user = await User.findById(req.params.id)
    const blogs = await Blog.find().populate('category').populate('author')
    res.render('admin', {user: user ,loginUser:req.user, blogs: blogs})
})

router.get('/logged-out-comment' , (req, res)=>{
    res.render('logged-out-comment',{user:req.user ? req.user : {}})
})

router.get('/new-blog' , async (req, res)=>{
    const allCategories = await Category.find()
    res.render('new-blog',{categories: allCategories, user:req.user ? req.user : {}})
})

router.get('/login' , (req, res)=>{
    res.render('login',{user:req.user ? req.user : {}})
})

router.get('/register' , (req, res)=>{
    res.render('register',{user:req.user ? req.user : {}})
})

router.get('/edit/:id' , async (req, res)=>{
    const allCategories = await Category.find()
    const blogs = await Blog.findById(req.params.id)
    res.render('editBlog',{categories: allCategories ,user:req.user ? req.user : {}, blogs: blogs})
})

router.get('/detail/:id' , async(req, res)=>{
    const rates = await Rate.find({blogId: req.params.id}).populate('authorId')
    const rateCount = await Rate.find({blogId: req.params.id}).countDocuments();
    const blog = await Blog.findById(req.params.id).populate('category').populate('author')
    console.log("rates: " + rates);
    console.log("Blog: " + blog);
    res.render('detail',{user:req.user ? req.user : {}, blog: blog, rates: rates, rateCount: rateCount})
})

module.exports = router