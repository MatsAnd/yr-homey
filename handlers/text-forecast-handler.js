const Homey = require('homey')
const { getTextForecast } = require('yr-forecast')
const { TEXT_FORECAST } = require('../config')
const getLocation = require('../lib/get-location')
const repackTextForecast = require('../lib/text-forecast-repack')
const moment = require('moment')

let currentTextForecast = {}
const flowTokens = []

module.exports = async (app) => {
  app.log('TextForecast - Loaded!')

  const registerTokens = async () => {
    try {
      app.log('TextForecast - Registering tokens...')

      const flowTokenIds = ['textcast-1', 'textcast-2', 'textcast-3', 'textcast-4', 'textcast-updated']
      flowTokenIds.map(id => {
        new Homey.FlowToken(id, { type: 'string', title: Homey.__(`tokens.${id}`) })
          .register()
          .then(token => {
            app.log(`TextForecast - Registered token ${token.id}!`)
            flowTokens.push(token)
          })
      })

      app.log('TextForecast - Tokens registered!')
    } catch (error) {
      app.error('TextForecast - Unable to register tokens!', error)
    }
  }

  const registerTasks = async () => {
    try {
      app.log('TextForecast - Registering cron jobs...')

      const updateJob = await Homey.ManagerCron.registerTask(TEXT_FORECAST.UPDATE_CRON.ID, TEXT_FORECAST.UPDATE_CRON.SCHEDULE, null)
      updateJob.on('run', update)

      app.log('TextForecast - Cron jobs registered!')
    } catch (error) {
      app.error('TextForecast - Unable to register cron jobs!', error)
    }

    // Gather som initial data...
    await update()
  }

  const update = async () => {
    const { lat, lon } = getLocation()
    app.log(`TextForecast - Gathering updated text forecast for location (lat: ${lat}, lon: ${lon})...`)

    const newTextForecast = await getTextForecast(lat, lon)
    currentTextForecast = newTextForecast.map(repackTextForecast)

    app.log('Forecast - Forecast updated!')

    updateFlowCards()
  }

  const updateFlowCards = () => {
    app.log('TextForecast - Updating flow cards...')

    flowTokens.forEach(token => {
      if (token.id === 'textcast-1') {
        token.setValue(currentTextForecast[0].forecast)
      }
      if (token.id === 'textcast-2') {
        token.setValue(currentTextForecast[1].forecast)
      }
      if (token.id === 'textcast-3') {
        token.setValue(currentTextForecast[2].forecast)
      }
      if (token.id === 'textcast-4') {
        token.setValue(currentTextForecast[3].forecast)
      }
      if (token.id === 'textcast-updated') {
        const formattedDate = moment().format(Homey.__('dateformat'))
        token.setValue(formattedDate)
      }
    })

    app.log('TextForecast - Flow cards updated!')
  }

  // Register tokens and cron jobs on init!
  await registerTokens()
  await registerTasks()
}
