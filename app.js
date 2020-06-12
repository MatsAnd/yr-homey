'use strict'

const Homey = require('homey')
const app = require('./app.json')

class Yr extends Homey.App {
  onInit () {
    this.log(`${app.name.en} version ${app.version} is running...`)

    // Register flow cards
    this.registerTriggers()
    this.registerConditions()
  }

  registerTriggers () {
    this.log('Registering triggers...')
    new Homey.FlowCardTrigger('starts_to_rain').register()
  }

  registerConditions (conditions) {
    this.log(`Registering ${conditions ? conditions.length : 'none'} conditions!`)

    conditions.forEach(condition => {
      this.log(`Registering condition ${condition}...`)
      new Homey.FlowCardCondition(condition).register()
      this.log(`Registered condition ${condition}!`)
    })
  }
}

module.exports = Yr
