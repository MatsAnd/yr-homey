const Homey = require('homey')
const { getNowcast } = require('yr-forecast')
const repackNowcast = require('../lib/nowcast-repack')
const getRainShowers = require('../lib/nowcast-get-showers')
const getLocation = require('../lib/get-location')
const { NOWCAST } = require('../config')

let currentNowcast = {}

module.exports = async (app) => {
  app.log('Nowcast - Loaded!')

  const registerFlowCards = async () => {
    try {
      app.log('Nowcast - Registering flow cards...')

      new Homey.FlowCardTrigger('starts-to-rain').register()

      app.log('Nowcast - Flow cards registered!')
    } catch (error) {
      app.log('Nowcast - Unable to register flow cards!', error)
    }
  }

  const registerTasks = async () => {
    try {
      app.log('Nowcast - Registering cron jobs...')

      const updateJob = await Homey.ManagerCron.registerTask(NOWCAST.UPDATE_CRON.ID, NOWCAST.UPDATE_CRON.SCHEDULE, null)
      updateJob.on('run', update)

      const triggerJob = await Homey.ManagerCron.registerTask(NOWCAST.TRIGGER_CRON.ID, NOWCAST.TRIGGER_CRON.SCHEDULE, null)
      triggerJob.on('run', trigger)

      app.log('Nowcast - Cron jobs registered!')
    } catch (error) {
      app.log('Nowcast - Unable to register cron jobs!', error)
    }

    // Gather som initial data...
    update()
  }

  const update = async () => {
    const { lat, lon } = getLocation()
    app.log(`Nowcast - Gathering updated nowcast for location (lat: ${lat}, lon: ${lon})...`)

    const newNowcast = await getNowcast(lat, lon)
    currentNowcast = newNowcast.map(repackNowcast)

    app.log('Nowcast - Nowcast updated!')
  }

  const trigger = async () => {
    app.log('Nowcast - Checking if we should trigger...')

    const rainshowers = getRainShowers(currentNowcast)
    if (rainshowers && rainshowers.startsIn <= 59 && rainshowers.startsIn >= 0) {
      const tokens = { millimeters: rainshowers[0].precipitation.value, startsIn: rainshowers.startsIn, duration: rainshowers[0].duration }
      Homey.ManagerFlow.getCard('trigger', 'starts-to-rain').trigger(tokens)

      app.log(`Nowcast - Triggered - starts to rain in ${rainshowers.startsIn} seconds`)
    } else {
      app.log(`Nowcast - Don't trigger - next shower starts in ${rainshowers.startsIn}`)
    }
  }

  // Register flow cards and cron jobs on init!
  await registerFlowCards()
  await registerTasks()
}
