const Rate = require('./Rates')

const saveRate = async (req, res) =>{
    await new Rate({
        text: req.body.text,
        authorId: req.body.authorId,
        blogId: req.body.blogId,
        date: Date.now()
    }).save()
    res.status(200).send(true)
}

module.exports = {saveRate}