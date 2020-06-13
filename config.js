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
  },
  FORECAST: {
    UPDATE_CRON: {
      ID: 'no.matsa.yr.cron_updateForecast',
      SCHEDULE: '*/30 * * * *'
    },
    TRIGGER_CRON: {
      ID: 'no.matsa.yr.cron_triggerForecast',
      SCHEDULE: '*/5 * * * *'
    }
  }
}
