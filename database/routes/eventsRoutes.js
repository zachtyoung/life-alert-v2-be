const express = require('express');
const Shared = require('../models/shared-model');
const Event = require('../models/events-model')
const router = express.Router();

//GET all events
router.get('/', (req, res) => {
    Shared.get('events')
    .then(data =>{
        res.status(200).json(data)
    })

});
//GET event by ID
router.get('/:id', (req, res) => {
    const {id} = req.params
    Event.get(id)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err => console.log(err))
});
//POST new event
router.post('/', (req, res) => {
    let event = req.body;
    Shared.add('events', event)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err =>{
        console.log(err)
        res.status(400).json(err)
    })
  });
//PUT an existing event
router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;
  
    changes? Shared.update('events', id, changes) .then(updated =>{
        if(updated){
            res.status(200).json(updated)
        } else{
            res.status(404).json({ message: "The event with the specified ID does not exist." })
        }
    }) .catch(err =>{
        res.status(500).json({ error: "The event information could not be modified.", errorMessage:err })
    }) : res.status(400).json({ errorMessage: "Please provide id and changes for the event." })
  })
  //DELETE an event
  router.delete('/:id', (req, res) => {
    const {id} = req.params;
    Shared.remove('events', id)
    .then(response =>{
        res.status(200).json(response)
    })
    .catch(err =>{
        res.status(500).json({ error: "The event could not be removed" })
    })
});

module.exports = router;