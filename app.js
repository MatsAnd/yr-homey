'use strict'

const Homey = require('homey')
const app = require('./app.json')

class Yr extends Homey.App {
  onInit () {
    this.log(`${app.name.en} version ${app.version} is running!`)

    // Instantiate handlers
    this.log('App - Instantiate handlers...')
    this.Nowcast = require('./handlers/nowcast-handler')(this)
    this.Forecast = require('./handlers/forecast-handler')(this)

    // @ts-ignore
    Homey.on('unload', async () => {
      await this.unregisterTasks()
    })
  }

  async unregisterTasks () {
    const currentTasks = await Homey.ManagerCron.getTasks()
    if (currentTasks && currentTasks.length > 0) {
      this.log(`App - Unregistering ${currentTasks.length} existing cron jobs...`)
      await Homey.ManagerCron.unregisterAllTasks()
    }
  }
}

module.exports = Yr
