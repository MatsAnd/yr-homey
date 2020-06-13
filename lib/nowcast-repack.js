module.exports = ({ from, to, precipitation }) => {
  from = new Date(from)
  to = new Date(new Date(from).getTime() + (5 * 60 * 1000)) // Add 5 minutes so the timeline gets correct

  return {
    from,
    to,
    precipitation
  }
}
