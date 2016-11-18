import { expect } from "chai"
import { LoadConnectionsCommand } from "./LoadConnectionsCommand"
import { SaveConnectionsCommand } from "./SaveConnectionsCommand"

import { Connection } from "../models/Connection"

import jetpack from "fs-jetpack"
import { remote } from "electron"

var app = remote.app

var testConnections = [
	new Connection({
		id: "a",
		url: "url",
		username: "a"
	}),
	new Connection({
		id: "b",
		url: "url",
		username: "b"
	})
]

describe("LoadConnectionsCommand", function() {
	"use strict"

	before(function() {
		jetpack.copy(app.getPath("appData") + "/NetTail/Connections.json", app.getPath("appData") + "/NetTail/Connections.json.bak", {
			overwrite: true
		})
		SaveConnectionsCommand.execute(testConnections)
	})

	after(function() {
		jetpack.copy(app.getPath("appData") + "/NetTail/Connections.json.bak", app.getPath("appData") + "/NetTail/Connections.json", {
			overwrite: true
		})
	})

	it("execute", function() {
		LoadConnectionsCommand.execute().then((connections) => {
			var foundConnections = 0

			for (let connection of connections) {
				expect(connection).to.have.property("id")
				expect(connection).to.have.property("url")
				expect(connection).to.have.property("username")

				for (let testConnection of testConnections) {
					if (testConnection.id === connection.id) {
						expect(connection.id).to.equal(testConnection.id)
						expect(connection.url).to.equal(testConnection.url)
						expect(connection.username).to.equal(testConnection.username)

						foundConnections++
					}
				}
			}

			expect(foundConnections).to.equal(testConnections.length)
		}).catch((error) => {
			throw error
		})
	})

})
