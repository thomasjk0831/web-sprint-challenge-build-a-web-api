const express = require('express')
const Actions = require('../data/helpers/actionModel')
const validateActionId = require('../middleware/validateActionId')
const router = express.Router()

router.get('/', (req,res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "error retrieving actions"})
    })
})

router.get('/:id', validateActionId, (req,res) => {
    res.status(200).json(req.action)
 })

 router.post('/', (req,res)=>{
     if(!req.body.description){
         res.status(404).json({message: "requires description"})
     }
     else if (!req.body.notes){
        res.status(404).json({message: "requires notes"})

     }
     else if (!req.body['project_id']){
        res.status(404).json({message: "requires project id"})

     }
     else{
        Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err=>{
            res.status(500).json({message: "server error"})
        })

     }
    
 })

 router.put('/:id', validateActionId, (req,res)=>{
    if(!req.body.description){
        res.status(404).json({message: "requires description"})
    }
    else if (!req.body.notes){
       res.status(404).json({message: "requires notes"})

    }
    else if (!req.body['project_id']){
       res.status(404).json({message: "requires project id"})

    }
    else{
        Actions.update(req.params.id, req.body)
        .then(action =>{
            res.status(200).json(action)
        })
        .catch(err=>{
            res.status(500).json({message: "server error"})
        })
    }
 })

 router.delete('/:id', validateActionId, (req,res)=>{
     Actions.remove(req.params.id)
     .then(count =>{
         res.status(200).json({message: "success"})
     })
     .catch(error=>{
         res.status(500).json({message: "server error"})
     })
 })

module.exports = router