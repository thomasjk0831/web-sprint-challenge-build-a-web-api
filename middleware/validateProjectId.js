const Projects = require('../data/helpers/projectModel')

module.exports = function(req,res,next) {
    Projects.get(req.params.id)
    .then(project =>{
        if(project){
            req.project = project
            next()
        }
        else{
            res.status(400).json({message: "project not found"})
        }
    })

    .catch(error =>{
        res.status(500).json({
            message: "Server error"
        })
    })
}