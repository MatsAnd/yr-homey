module.exports = {
  NOWCAST: {
    UPDATE_CRON: {
      ID: 'no.matsa.yr.cron_updateNowcast',
      SCHEDULE: '*/10 * * * *'
    },
    TRIGGER_CRON: {
      ID: 'no.matsa.yr.cron_triggerNowcast',
      SCHEDULE: '*/1 * * * *'
    }
  }
}
