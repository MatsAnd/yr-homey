module.exports = {
  NOWCAST: {
    UPDATE_CRON: {
      ID: 'no.matsa.yr.cron_updateNowcast',
      SCHEDULE: '*/10 * * * *' // Every 10 minutes
    },
    TRIGGER_CRON: {
      ID: 'no.matsa.yr.cron_triggerNowcast',
      SCHEDULE: '*/1 * * * *' // Every 1 minute
    }
  },
  FORECAST: {
    UPDATE_CRON: {
      ID: 'no.matsa.yr.cron_updateForecast',
      SCHEDULE: '*/30 * * * *' // Every 30 minutes
    },
    TRIGGER_CRON: {
      ID: 'no.matsa.yr.cron_triggerForecast',
      SCHEDULE: '*/5 * * * *' // Every 5 minutes
    }
  },
  TEXT_FORECAST: {
    UPDATE_CRON: {
      ID: 'no.matsa.yr.cron_updateTextForecast',
      SCHEDULE: '59 */1 * * *' // Every 1 hour at minute 59
    }
  }
}
