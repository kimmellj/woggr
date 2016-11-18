import request from "request"
import {LogModel} from "../models/LogModel"
import Log from "loglevel"

/**
 * This class represents the LoadLogListCommand
 *
 * The Load Log List Command is responsible for loading a list of log files on
 * the specified connection.
 *
 * @extends {Command}
 * @example
 * import {LoadLogListCommand} from "./src/components/LoadLogListCommand"
 *
 * var connections = LoadLogListCommand.execute().then(logs => {
 * 	//Code to execute with the list of log files
 * }).catch((error) => {
 * 	//Error handling logic
 * });
 */
export class LoadLogListCommand {
	/**
	 * Execute
	 * Return a Promise that will load a list of log files from the passed in
	 * connection. The list of log files is found by grepping for any links and attempting
	 * to also grep for dates in the HTTP Date format RFC 822
	 * Sun, 06 Nov 1994 08:49:37 GMT  ; RFC 822, updated by RFC 1123.
	 * If the number of links match the number of dates, is is assumed that they
	 * match with one another and they are both add to the Log Model. The final
	 * list will be an array of Log Models.
	 *
	 * @param {Connection} connection Connection to load the list of log files from
	 * @return {Promise} A promise to asynchronously respond to the execution of this code
	 */
	static execute(connection) {
		Log.info("LoadLogListCommand : " + connection.protocol + "://" + connection.hostname + ":" + connection.port)

		var params = {
			baseUrl: connection.protocol + "://" + connection.hostname + ":" + connection.port,
			uri: connection.path,
			auth: {
				user: connection.username,
				password: connection.password
			},
			strictSSL: false,
			method: "GET",
			headers: {
				Depth: 1
			}
		}

		return new Promise(
			function(resolve, reject) {
				request(params, function(err, res, body) {
					if (err) {
						reject(err)
						return
					}
					if (res.statusCode >= 400) {
						reject(res.statusMessage)
						return
					}

					let logs = []
					let dates = []

					let logsRegex = /<a(?:.*?)href *= *(?:"|')(.*?)(?:"|')(?:.*?)>/gi
					let datesRegex = /(Mon|Tue|Wed|Thu|Fri|Sat|Sun), [\d]* [a-zA-Z]* [\d]* [\d]{2}:[\d]{2}:[\d]{2}\ GMT/gi

					let match = null

					while ((match = logsRegex.exec(body)) !== null) {
						logs.push(match[1])
					}

					while ((match = datesRegex.exec(body)) !== null) {
						dates.push(match[0])
					}

					Log.debug("Logs: ")
					Log.debug(logs)

					Log.debug("Dates:")
					Log.debug(dates)

					/**
					 * If the number of dates match the number, it can be reasonably
					 * assumed that they equate one another. Since this is the case,
					 * add both the date and the file name to the object
					 */
					if (logs.length === dates.length) {
						for (let logKey in logs) {
							logs[logKey] = new LogModel({
								id: logKey,
								filename: logs[logKey],
								date: dates[logKey]
							})
						}

						logs.sort((left, right) => {
							let comparisonStringLeft = null
							let comparisonStringRight = null

							if (left.date) {
								comparisonStringLeft = left.date.getTime()
								comparisonStringRight = right.date.getTime()
							} else {
								comparisonStringLeft = left.fileName
								comparisonStringRight = right.fileName
							}

							if (comparisonStringLeft === comparisonStringRight) {
								return 0
							}

							return ((comparisonStringLeft > comparisonStringRight) ? -1 : 1)
						})
					} else {
						for (let logKey in logs) {
							logs[logKey] = new LogModel({
								filename: logs[logKey],
								date: false
							})
						}
					}

					resolve(logs)
				})
			}
		)
	}
}
