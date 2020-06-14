module.exports = ({ from, to, areas }) => {
  from = new Date(from)
  to = new Date(from)

  let forecast = ''
  let forecastArea = ''

  if (areas && areas.length > 0) {
    forecast = areas[0].forecast
    forecastArea = areas[0].name
  }

  return {
    from,
    to,
    forecast,
    area: forecastArea
  }
}
