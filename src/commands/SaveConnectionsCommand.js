import {Command} from "./Command"
import jetpack from "fs-jetpack"
import {remote} from "electron"
import Log from "loglevel"

/**
 * This class represents the SaveConnectionsCommand
 *
 * The Save Connections Command is responsible for save the current users
 * list of connections to persistent storage.
 *
 * The following is the current storage location:
 *
 * /{SYSTEM APPLICATION DATA FOLDER} / {APPLICATION NAME} / Connections.json
 *
 * @extends {Command}
 * @example
 * import {SaveConnectionsCommand} from "./src/components/SaveConnectionsCommand"
 *
 * new SaveConnectionsCommand.execute()
 */
export class SaveConnectionsCommand {

	/**
	 * Execute
	 * Save the passed in connections to persistent storage
	 * A call to each connections toObject will be used to represent a simple
	 * representation of the connections
	 * @param {Array} connections Array of Connection Instances
	 * @todo Return a promise to be consistent with the other commands
	 */
	static execute(connections) {
		var app = remote.app

		Log.info("Save Connections to: " + app.getPath("appData") + "/" + app.getName())

		var appDir = jetpack.cwd(app.getPath("appData") + "/" + app.getName())

		var rawConnectionList = []

		for (var connection of connections) {
			rawConnectionList.push(connection.toObject())
		}

		appDir.write("Connections.json", rawConnectionList, {
			jsonIndent: 4
		})

	}
}
