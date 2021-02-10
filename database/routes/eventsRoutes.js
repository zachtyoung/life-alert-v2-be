const express = require('express');
const Shared = require('../models/shared-model');
const Event = require('../models/events-model')
const router = express.Router();
// var moment = require('moment-timezone');
// moment.tz.setDefault("America/Monterrey");
// var seconds = 1612986687
// var seconds2 = 1612986937
// var mili = seconds * 1000
// let days = ["Sun", 'Mon', 'Tues', 'Wed', "Thurs", "Fri", "Sat"]
// //sample variables
// let e_duration = seconds2 - seconds
// console.log(moment(mili).format('MM DD YY'))
// let e_start_12h = moment(mili).format('hh:mm:ss a')
// let e_start_24h = moment(mili).format('HH:mm:ss ')
// let e_weekday = days[moment(mili).weekday()]
// let e_month = moment(mili).month()+1
// let e_day_of_month = moment(mili).date()



// let e_year = moment(mili).year()
// console.log(e_duration, e_start_12h, e_start_24h,e_weekday, e_month, e_day_of_month, e_year)
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
    event.duration_seconds = event.event_end - event.event_start
    let start_mili = event.event_start * 1000
    console.log( start_mili)
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