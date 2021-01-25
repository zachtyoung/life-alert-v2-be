exports.up = function(knex) {
    return knex.schema
    .createTable('meds_list', meds_list => {
        meds_list.increments();
        meds_list.string('name')
        meds_list.string('rx')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('meds_list')
  };