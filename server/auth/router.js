const express = require('express')
const router = express.Router();
const passport = require('passport')
const {signUp, signIn, signOut} = require('./controller')
const createAdmin = require('../admin/seed')

router.post('/api/signup', signUp)
router.post('/api/signin', passport.authenticate('local', {failureRedirect:'/login?error=1'}), signIn)
router.get('/api/signout', signOut)
router.get('/api/auth/github', passport.authenticate('github', {failureRedirect:'/login?error=2'}), (req, res)=>{
    res.redirect('/my-blogs/' + req.user._id)
})

createAdmin()

module.exports = router