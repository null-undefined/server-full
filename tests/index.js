'use strict'

const request = require('supertest')
const { expect } = require('chai')

const app = require('../src/app')

describe('index route', async () => {
	it('status code page not found', async () => {
		const response = await request(app).get('/')
		expect(response.statusCode).to.equal(404)
		expect(response.body).to.be.an('object')
		expect(response.body).to.have.property('error')
		expect(response.body).to.deep.equal({ error: 'page not found' })
	})
})
