import { expect } from "chai"
import { LoadLogCommand } from "./LoadLogCommand"

import { Connection } from "../models/Connection"
import { LogModel } from "../models/LogModel"

import { Buffer } from "buffer"

var testConnection = new Connection({
	id: "testconnection",
	url: "http://localhost:8080",
	username: null
})

var log = new  LogModel(
	{
		id: "abcdefg",
		filename: "/foo/bar/test/foobar.log",
		date: "Wed, 21 Oct 2015 07:28:00 GMT"
	}
)

describe("LoadLogCommand", function() {
	"use strict"

	before(function() {
	})

	after(function() {
	})

	it("execute", function(done) {

		let numBytesToTruncate = 321
		let p1 = LoadLogCommand.execute(testConnection, log, 0)

		p1.then((response) => {
			let numBytes = parseInt(response.response.headers['content-length'], 10)

			expect(response.body).to.not.be.empty
			expect(numBytes).to.be.above(0)

			let startPoint = numBytes - numBytesToTruncate

			let p2 = LoadLogCommand.execute(testConnection, log, startPoint)

			p2.then((response) => {
				let numBytes = parseInt(response.response.headers['content-length'], 10)

				expect(response.body).to.not.be.empty
				expect(numBytes).to.be.above(0)
				expect(numBytes).to.equal(numBytesToTruncate)

				done()
			}).catch((error) => {
				done(error)
			})
		}).catch((error) => {
			done(error)
		})
	})
})
