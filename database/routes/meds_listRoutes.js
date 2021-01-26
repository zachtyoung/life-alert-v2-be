const express = require('express');
const Shared = require('../models/shared-model');
const router = express.Router();

//GET all meds_list
router.get('/', (req, res) => {
    Shared.get('meds_list')
    .then(data =>{
        res.status(200).json(data)
    })

});
//GET med_list by ID
router.get('/:id', (req, res) => {
    const {id} = req.params
    Shared.get('meds_list', id)
    .then(data =>{
        res.status(200).json(data)
    })
});
//POST new med_list
router.post('/', (req, res) => {
    let med_list = req.body;
    Shared.add('meds_list', med_list)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err =>{
        console.log(err)
        res.status(400).json(err)
    })
  });
//PUT an existing med_list
router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;
  
    changes? Shared.update('meds_list', id, changes) .then(updated =>{
        if(updated){
            res.status(200).json(updated)
        } else{
            res.status(404).json({ message: "The med_list with the specified ID does not exist." })
        }
    }) .catch(err =>{
        res.status(500).json({ error: "The med_list information could not be modified.", errorMessage:err })
    }) : res.status(400).json({ errorMessage: "Please provide id and changes for the med_list." })
  })
  //DELETE an med_list
  router.delete('/:id', (req, res) => {
    const {id} = req.params;
    Shared.remove('meds_list', id)
    .then(response =>{
        res.status(200).json(response)
    })
    .catch(err =>{
        res.status(500).json({ error: "The med_list could not be removed" })
    })
});

module.exports = router;