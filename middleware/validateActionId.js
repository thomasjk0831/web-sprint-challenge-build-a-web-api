const Actions = require('../data/helpers/actionModel')

module.exports = function(req,res,next) {
    Actions.get(req.params.id)
    .then(action =>{
        if(action){
            req.action = action
            next()
        }
        else{
            res.status(400).json({message: "Action not found"})
        }
    })

    .catch(error =>{
        res.status(500).json({
            message: "Server error"
        })
    })
}