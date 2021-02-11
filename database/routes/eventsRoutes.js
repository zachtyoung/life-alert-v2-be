const express = require('express');
const Shared = require('../models/shared-model');
const Event = require('../models/events-model')
const router = express.Router();
var moment = require('moment-timezone');
moment.tz.setDefault("America/Monterrey");

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
event.event_start_int = event.event_start_datetime
event.events_end_int = event.event_end
var mili = event.event_start_datetime * 1000
var mili_tz = (event.event_start_datetime -21600) * 1000
var mili_end =(event.event_end -21600) * 1000

let days = ["Sun", 'Mon', 'Tues', 'Wed', "Thurs", "Fri", "Sat"]

event.duration_seconds = parseInt(event.event_end - event.event_start_datetime)
event.event_start_datetime = moment(mili_tz).format()

event.event_end = moment(mili_end).format()
event.event_start_12h_time = moment(mili).format('hh:mm:ss:a')
event.event_start_24h_time = moment(mili).format('HH:mm:ss')
event.event_day_of_week_string = days[moment(mili).weekday()]
event.event_day_of_week_int  = parseInt(moment(mili).weekday())
event.event_day_of_month= parseInt(moment(mili).date())
event.event_month = parseInt(moment(mili).month()+1)
event.event_year= parseInt(moment(mili).year())

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