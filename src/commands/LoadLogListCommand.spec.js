import {expect} from "chai"
import {LoadLogListCommand} from "./LoadLogListCommand"

import {Connection} from "../models/Connection"

var testConnection = new Connection({
	id: "testconnection",
	url: "http://localhost:8080",
	username: null
})

describe("LoadLogListCommand", function() {
	"use strict"

	before(function() {})

	after(function() {})

	it("execute", function(done) {
		this.timeout(15000)

		//expect(links).to.be.a("array")
		var p1 = LoadLogListCommand.execute(testConnection)

		p1.then((links) => {
			expect(links).to.be.a("array")
			done()
		}).catch((error) => {
			throw error
		})
	})
})
