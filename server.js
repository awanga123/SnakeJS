const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const { PORT } = process.env
app.listen(PORT || 3000, () => {
  console.log(`Listening on port ${PORT || 3000}`)
})
