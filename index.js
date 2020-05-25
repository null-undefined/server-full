'use strict'

const app = require('./src/app')

const port = app.get('port')

app.listen(port, console.log(`listening *:${port}`))
