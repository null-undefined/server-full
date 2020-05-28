'use strict'

const { buildSchema } = require('graphql')

const Users = require('./models/users')
const mail = require('./lib/mail')

const schema = buildSchema(`

	type Query {
		users: [User],
		user(id: ID!): User
	}
	
	type User {
		username: String!,
		password: String!
	}
	
	input UserInput {
		username: String,
		password: String
	}
	
	type Mutation {
		create(input: UserInput): User
	}
	
`)

const root = {
	users: async () => await Users.find(),
	user: async ({ id }) => await Users.findById(id),
	create: async ({ input: { username, password } }) => {
		const info = await mail.sendMail({
			from: 'Codetutor codetutor@mailtrap.com',
			to: `${ username } <codetutor.mailtrap.com>`,
			subject: 'Email confirmation',
			text: 'Welcome to Codetutor',
			html: '<h1>Welcome to Codetutor</h1>'
		})
		return { username, password }
	}
}

module.exports = { schema, root }