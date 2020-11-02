
module.exports = {

  dateParser: (selectedDate) => {
    return selectedDate.split('T')[0]
  },
  timeParser: (selectedDate) => {
    result = selectedDate.split('T')[1]
    return result.slice(0, -5)
  }

}
