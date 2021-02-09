const db = require('../dbConfig');
module.exports = {
    get
  };
  
  function get(id) {
    return db('events')
      .join('notes', 'notes.event_id', 'events.id')
      .join('meds', 'meds.event_id', 'events.id')
      .select('*')
      .where({'events.id': id});
  }