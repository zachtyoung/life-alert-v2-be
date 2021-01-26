exports.up = function(knex) {
    return knex.schema
    .createTable('notes', notes => {
        notes.increments();
        notes.integer('event_id').unsigned().notNullable().references('id').inTable('events').onUpdate('CASCADE').onDelete('CASCADE')
        notes.string('message', 1000)
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('notes')
  };