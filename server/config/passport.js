const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStategy = require('passport-local')
const GithubStrategy =require('passport-github2').Strategy


passport.use(new LocalStategy(
    {
        usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email}).then(user=>{
            bcrypt.compare(password, user.password, function(err, result) {
                if (err){
                    return done(err) 
                }
                if(result){
                    return done(null, user)
                }
            });
        }).catch(err =>{
            return done(err);
        })
    }
))

passport.use(new GithubStrategy({
    clientID: ClientID,
    clientSecret: ClientSecret,
    callbackURL: "http://localhost:8001/api/auth/github",
    scope: ['user', 'email']
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.find({githubid: profile.id})
    console.log(user);
    const newUser = await new User({
        githubid: profile.id,
        full_name: profile.displayName,
        email: profile.emails[0].value
    }).save()
    return cb(null, newUser)
  }
));

passport.serializeUser(function(user, done){
    console.log(user);
    done(null, user._id)
})

passport.deserializeUser(function(id, done){
    console.log(id);
    User.findById(id).then((user, err) =>{
        done(err, user)
    })
})