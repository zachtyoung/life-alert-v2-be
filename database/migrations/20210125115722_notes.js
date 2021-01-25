exports.up = function(knex) {
    return knex.schema
    .createTable('notes', notes => {
        notes.increments();
        notes.string('message', 1000)
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('notes')
  };