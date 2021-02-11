exports.up = function(knex) {
    return knex.schema
    .createTable('events', events => {
      events.increments();
      events.timestamp('event_start_datetime')
      events.bigInteger('event_start_int')

      events.string('event_start_12h_time')
      events.string('event_start_24h_time') 

      events.string('event_day_of_week_string')
      events.integer('event_day_of_week_int')
     
      events.integer('event_day_of_month')
      events.integer('event_month')
      events.integer('event_year')

      events.timestamp('event_end')
      events.bigInteger('events_end_int')

      events.integer('duration_seconds')
      events.integer('event_intensity')
      events.integer('max_dB')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('events')
  };
  /*Well, I was trying to avoid unnecessary confusion. According to this:
  https://en.wikipedia.org/wiki/Logarithm#Product.2C_quotient.2C_power_and_root
  than dB = 20 x log10(Amplitude) should be corrected to dB = 20 x log10(Amplitude) - zero_offset.
  From practical point of view, you just substituted as zero_level what ever level arduino measure in quite environment,  and subtract. It would include surround sound noise, mic+ preamp noise, adc inaccuracy, etc.*/

    //dB = (adc+83.2073) / 11.003;