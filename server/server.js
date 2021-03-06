const express = require('express')
const path = require('path')

const port = process.env.PORT || 3000
const app = express()

// the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname + '/public'))
const publicPath = path.join(__dirname, '..', 'public')
app.use(express.static(publicPath))

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'index.html'))
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port)
console.log(`Server started on port ${port}`)
