const express = require('express');
const Shared = require('../models/shared-model');
const router = express.Router();

//GET all meds
router.get('/', (req, res) => {
    Shared.get('meds')
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err => console.log(err))

});
//GET med by ID
router.get('/:id', (req, res) => {
    const {id} = req.params
    Shared.get('meds', id)
    .then(data =>{
        res.status(200).json(data)
    })
});
//POST new med
router.post('/', (req, res) => {
    let med = req.body;
    Shared.add('meds', med)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err =>{
        console.log(err)
        res.status(400).json(err)
    })
  });
//PUT an existing med
router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;
  
    changes? Shared.update('meds', id, changes) .then(updated =>{
        if(updated){
            res.status(200).json(updated)
        } else{
            res.status(404).json({ message: "The med with the specified ID does not exist." })
        }
    }) .catch(err =>{
        res.status(500).json({ error: "The med information could not be modified.", errorMessage:err })
    }) : res.status(400).json({ errorMessage: "Please provide id and changes for the med." })
  })
  //DELETE an med
  router.delete('/:id', (req, res) => {
    const {id} = req.params;
    Shared.remove('meds', id)
    .then(response =>{
        res.status(200).json(response)
    })
    .catch(err =>{
        res.status(500).json({ error: "The med could not be removed" })
    })
});

module.exports = router;