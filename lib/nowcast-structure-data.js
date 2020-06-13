module.exports = (nowcasts) => {
  if (!nowcasts || nowcasts.length === 0) return []

  // Remove entries from the nowcasts that have passed.
  nowcasts = nowcasts.filter(nowcast => new Date(nowcast.to) > new Date())

  // Get all nowcasts that's having more perticipated rainfall than 0 mm/h
  nowcasts = nowcasts.filter(nowcast => nowcast.precipitation.value !== '0.0')

  // Sort dates after "from" date, just to be sure..
  nowcasts = nowcasts.sort((a, b) => a.from - b.from)

  const showers = []
  nowcasts.forEach(nowcast => {
    const showerCount = showers.length

    // Add duration
    nowcast.duration = calculateDurationInMinutes(nowcast.from, nowcast.to)

    // First item
    if (showerCount === 0) {
      showers.push(nowcast)
      return
    }

    const lastShowerIndex = showerCount - 1
    const lastShower = showers[lastShowerIndex]

    // If the old event stops when the new one starts, change the to date, and calculate rain precipitation
    if (lastShower.to.getTime() === nowcast.from.getTime()) {
      lastShower.to = nowcast.to
      lastShower.precipitation = sumPrecipitation(lastShower, nowcast)
      lastShower.duration = calculateDurationInMinutes(lastShower.from, nowcast.to)
    } else {
      // New range of dates
      showers.push(nowcast)
    }
  })

  return showers
}

const sumPrecipitation = ({ to: firstTo, from: firstFrom, precipitation: firstPrecipitation },
  { to: secondTo, from: secondFrom, precipitation: secondPrecipitation }, decimals = 2) => {
  const firstDuration = calculateDurationInHours(firstFrom, firstTo)
  firstPrecipitation = parseFloat(firstPrecipitation.value) * firstDuration

  const secondDuration = calculateDurationInHours(secondFrom, secondTo)
  secondPrecipitation = parseFloat(secondPrecipitation.value) * secondDuration

  const totalDuration = firstDuration + secondDuration
  const totalPrecipitation = (firstPrecipitation + secondPrecipitation) / totalDuration

  return {
    unit: 'mm/h',
    value: totalPrecipitation.toFixed(decimals)
  }
}

const calculateDurationInHours = (from, to) => {
  return (to.getTime() - from.getTime()) / 1000 / 86400
}

const calculateDurationInMinutes = (from, to) => {
  return (to.getTime() - from.getTime()) / 1000 / 60
}
