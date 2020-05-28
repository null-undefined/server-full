'use strict'

const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
	username: String,
	password: String
}, {
		versionKey: false,
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
	}
)

module.exports = model('users', UserSchema)
