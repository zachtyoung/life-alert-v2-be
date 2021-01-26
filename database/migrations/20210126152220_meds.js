exports.up = function(knex) {
    return knex.schema
    .createTable('meds', meds => {
        meds.increments();
        meds.integer('event_id').unsigned().notNullable().references('id').inTable('events').onUpdate('CASCADE').onDelete('CASCADE')
        meds.integer('meds_list_id').unsigned().notNullable().references('id').inTable('meds_list').onUpdate('CASCADE').onDelete('CASCADE')
        meds.integer('med_dose_mg')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('meds')
  };