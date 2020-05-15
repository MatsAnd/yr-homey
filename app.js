'use strict'

const Homey = require('homey')

class Yr extends Homey.App {
  onInit () {
    this.log('Yr is running...')
  }
}

module.exports = Yr
