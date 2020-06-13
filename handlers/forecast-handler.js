const Homey = require('homey')
const { getForecast } = require('yr-forecast')
const { FORECAST } = require('../config')
const getLocation = require('../lib/get-location')

let currentForecast = {}

module.exports = async (app) => {
  app.log('Forecast - Loaded!')

  const registerFlowCards = async () => {
    try {
      app.log('Forecast - Registering flow cards...')

      app.log('Forecast - Flow cards registered!')
    } catch (error) {
      app.error('Forecast - Unable to register flow cards!', error)
    }
  }

  const registerTasks = async () => {
    try {
      app.log('Forecast - Registering cron jobs...')

      const updateJob = await Homey.ManagerCron.registerTask(FORECAST.UPDATE_CRON.ID, FORECAST.UPDATE_CRON.SCHEDULE, null)
      updateJob.on('run', update)

      const triggerJob = await Homey.ManagerCron.registerTask(FORECAST.TRIGGER_CRON.ID, FORECAST.TRIGGER_CRON.SCHEDULE, null)
      triggerJob.on('run', trigger)

      app.log('Forecast - Cron jobs registered!')
    } catch (error) {
      app.error('Forecast - Unable to register cron jobs!', error)
    }

    // Gather som initial data...
    update()
  }

  const update = async () => {
    const { lat, lon } = getLocation()
    app.log(`Forecast - Gathering updated forecast for location (lat: ${lat}, lon: ${lon})...`)

    currentForecast = await getForecast(lat, lon)

    app.log('Forecast - Forecast updated!')
  }

  const trigger = async () => {
    app.log('Forecast - Checking if we should trigger...')
    app.log('Forecast - Don\'t trigger')
  }

  // Register flow carts and cron jobs on init!
  await registerFlowCards()
  await registerTasks()
}
