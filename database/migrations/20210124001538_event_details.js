exports.up = function(knex) {
    return knex.schema
    .createTable('event_details', event_details => {
        event_details.increments();
        event_details.integer('event_id').unsigned().notNullable().references('id').inTable('events').onUpdate('CASCADE').onDelete('CASCADE')
        event_details.integer('notes_id').unsigned().notNullable().references('id').inTable('notes').onUpdate('CASCADE').onDelete('CASCADE')
        event_details.integer('meds_id').unsigned().notNullable().references('id').inTable('meds').onUpdate('CASCADE').onDelete('CASCADE')
        
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('event_details')
  };