const db = require('../dbConfig');
module.exports = {
    get,
    add,
    findById,
    update,
    remove,
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
  function update(database, id, changes) {
    return db(database)
      .where({ id })
      .update(changes);
      
  }
  function remove(database,id) {
    return db(database)
      .where('id', id)
      .del();
  }