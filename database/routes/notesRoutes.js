const express = require('express');
const Shared = require('../models/shared-model');
const router = express.Router();

//GET all notes
router.get('/', (req, res) => {
    Shared.get('notes')
    .then(data =>{
        res.status(200).json(data)
    })

});
//GET note by ID
router.get('/:id', (req, res) => {
    const {id} = req.params
    Shared.get('notes', id)
    .then(data =>{
        res.status(200).json(data)
    })
});
//POST new note
router.post('/', (req, res) => {
    let note = req.body;
    Shared.add('notes', note)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err =>{
        console.log(err)
        res.status(400).json(err)
    })
  });
//PUT an existing note
router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;
  
    changes? Shared.update('notes', id, changes) .then(updated =>{
        if(updated){
            res.status(200).json(updated)
        } else{
            res.status(404).json({ message: "The note with the specified ID does not exist." })
        }
    }) .catch(err =>{
        res.status(500).json({ error: "The note information could not be modified.", errorMessage:err })
    }) : res.status(400).json({ errorMessage: "Please provide id and changes for the note." })
  })
  //DELETE an note
  router.delete('/:id', (req, res) => {
    const {id} = req.params;
    Shared.remove('notes', id)
    .then(response =>{
        res.status(200).json(response)
    })
    .catch(err =>{
        res.status(500).json({ error: "The note could not be removed" })
    })
});

module.exports = router;