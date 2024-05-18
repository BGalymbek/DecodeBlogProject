const isAuth = (req, res , next) =>{
    if(req.user && !req.user.isAdmin){
        next()
    }else{
        res.status(401).send('Unauthorized login with simple account')
    }
}

const isAuthEdit = (req, res , next) =>{
    if(req.user && !req.user.isAdmin){
        next()
    }else{
        res.status(401).send('You can not edit this Blog. Only author!')
    }
}

module.exports = {isAuth, isAuthEdit}