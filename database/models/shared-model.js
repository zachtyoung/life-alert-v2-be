const db = require('../dbConfig');
module.exports = {
    get,
    add,
    findById,
  };
  
  function get(database) {
    return db(database)
  }
  function add(database, data) {
    return db(database).insert(data)
  }
  function findById(database,id){
    return db(database)
    .where('id', id)
    .first()
  }