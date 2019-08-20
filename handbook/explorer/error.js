module.exports = (folderPath, output, end) => {
  output(folderPath, {
    error: 'This is an error'
  })
  end()
}
