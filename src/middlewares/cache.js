'use strict'

const mcache = require('memory-cache')

const cache = duration => {
	return async (req, res, next) => {
		const key = '__express__' + req.originalUrl
		const cached = mcache.get(key)
		if (cached) {
			res.json(cached)
			return
		}
		res.response = res.json
		res.json = data => {
			mcache.put(key, data, duration * 1000)
			res.response(data)
		}
		next()
	}
}

module.exports = cache
