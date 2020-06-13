const structureShowers = require('./nowcast-structure-data')

module.exports = (currentNowcast) => {
  // Get structured list of rain showers
  const structuredShowers = structureShowers(currentNowcast)
  const showerStartsIn = structuredShowers[0] ? ((new Date(structuredShowers[0].from).getTime()) - (new Date().getTime())) / 1000 : -1

  return {
    startsIn: showerStartsIn,
    showers: [
      ...structuredShowers
    ]
  }
}
