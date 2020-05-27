'use strict'

require('dotenv').config()

const path = require('path')

const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')

const app = express()
app.set('port', process.env.PORT || 5000)

app.use(express.json())
app.use(cors())
if (app.get('env') === 'development') {
	app.use(morgan('dev'))
} else {
	const accessLogStream = rfs.createStream('access.log', {
		size: '10M',
		interval: '3d',
		path: path.resolve(__dirname, '..', 'logs')
	})
	app.use(morgan('combined', { stream: accessLogStream }))
}


app.use('/graphql', graphqlHTTP({
	schema: buildSchema(`
		type RootQuery {
			hello: String
		}
		
		schema {
			query: RootQuery
		}
	`),
	rootValue: {
		hello: () => 'Welcome'
	},
	graphiql: true
}))

app.use('*', async (req, res, next) => {
	res.status(404)
	next(new Error('page not found'))
})

app.use(async (err, req, res, next) => {
	const statusCode = res.statusCode || 500
	res
		.status(statusCode)
		.json({ error: err.message })
})

module.exports = app
