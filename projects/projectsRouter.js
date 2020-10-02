const express = require('express')
const Projects = require('../data/helpers/projectModel')
const validateProjectId = require('../middleware/validateProjectId')
const router = express.Router()

router.get('/', (req,res)=>{
    Projects.get()
    .then(projects=>{
        console.log(projects)
        res.status(200).json(projects)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "error retrieving"})
    })
})

router.get('/:id', validateProjectId, (req,res) => {
  res.status(200).json(req.project)
})

router.post('/', (req,res)=>{
    if(!req.body.description){
        res.status(404).json({message: "requires description"})
    }
    else if (!req.body.name){
       res.status(404).json({message: "requires name"})

    }
    else{
       Projects.insert(req.body)
       .then(project => {
           res.status(201).json(project)
       })
       .catch(err=>{
           res.status(500).json({message: "server error"})
       })

    }
   
})

router.put('/:id', validateProjectId, (req,res)=>{
    if(!req.body.description){
        res.status(404).json({message: "requires description"})
    }
    else if (!req.body.name){
       res.status(404).json({message: "requires name"})

    }
    else{
        Projects.update(req.params.id, req.body)
        .then(project =>{
            res.status(200).json(project)
        })
        .catch(err=>{
            res.status(500).json({message: "server error"})
        })
    }
 })

 router.delete('/:id', validateProjectId, (req,res)=>{
    Projects.remove(req.params.id)
    .then(count =>{
        res.status(200).json({message: "success"})
    })
    .catch(error=>{
        res.status(500).json({message: "server error"})
    })
})



module.exports = router
