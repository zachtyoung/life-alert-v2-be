const db = require('../dbConfig');
module.exports = {
    get,
    add,
    findById,
  };
  
  function get(db) {
    return db(db)
  }
  function add(db, data) {
    return db(db).insert(data)
  }
  function findById(db,id){
    return db(db)
    .where('id', id)
    .first()
  }