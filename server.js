const express = require('express');
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    next();
  });
  const Shared = require('./database/models/shared-model');
  server.get('/', (req, res) => {
    res.status(200).json("API RUNNING")

});

server.post('/event', (req, res) => {
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

server.post('/notes', (req, res) => {
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

server.post('/meds', (req, res) => {
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
server.post('/meds_list', (req, res) => {
  let med = req.body;
  Shared.add('meds_list', med)
  .then(data =>{
      res.status(200).json(data)
  })
  .catch(err =>{
      console.log(err)
      res.status(400).json(err)
  })

});
server.get('/events', (req, res) => {
  Shared.get('events')
  .then(data =>{
      res.status(200).json(data)
  })
  .catch(err =>{
      console.log(err)
      res.status(400).json(err)
  })

});

module.exports = server;