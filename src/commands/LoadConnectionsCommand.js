import {Command} from "./Command"
import {Connection} from "../models/Connection"
import jetpack from "fs-jetpack"
import {remote} from "electron"
import Log from "loglevel"

/**
 * This class represents the LoadConnectionsCommand
 *
 * The Load Connections Command is responsible for loading the current users
 * list of connections from persistent storage.
 *
 * The following is the current storage location:
 *
 * /{SYSTEM APPLICATION DATA FOLDER} / {APPLICATION NAME} / Connections.json
 *
 * @extends {Command}
 * @example
 * import {LoadConnectionsCommand} from "./src/components/LoadConnectionsCommand"
 *
 * var connections = LoadConnectionsCommand.execute().then(connections => {
 * 	//Code to execute with the list of connections
 * }).catch((error) => {
 * 	//Error handling logic
 * });
 *
 */
export class LoadConnectionsCommand extends Command {

	/**
	 * Execute
	 * Return a Promise that will load the users connections from persistent storage
	 * The raw data of connections will then be converted into an array of
	 * Connection models
	 * @return {Promise} A promise to asynchronously respond to the execution of this code
	 */
	static execute() {
		var app = remote.app

		Log.info("Loading the connections from: " + app.getPath("appData") + "/" + app.getName())

		return new Promise(
			function(resolve, reject) {
				var connections = []

				var appDir = jetpack.cwd(app.getPath("appData") + "/" + app.getName())

				var rawConnections = appDir.read("Connections.json", "json")

				/**
				 * If there are raw connections, loop across each one and create a
				 * new ConnectionModel instance.
				 */
				if (rawConnections) {
					for (let rawConnection of rawConnections) {
						var connection = new Connection(rawConnection)
						connections.push(connection)
					}

					resolve(connections)
				} else {
					reject("Connections could not be load")
				}
			}
		)
	}
}
