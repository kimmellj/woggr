import request from "request"
import Log from "loglevel"

/**
 * This class represents the LoadLogCommand
 *
 * The Load Log Command is responsible for loading content from a specified
 * log file using the specified connection.
 *
 * @extends {Command}
 * @example
 * import {LoadLogCommand} from "./src/components/LoadLogCommand"
 *
 * var content = LoadLogCommand.execute().then(data => {
 *
 * 	// Code to execute with the content returned. The returned content is in the
 * 	// form of the following object structure: {body: body, response: res}
 * 	// with body being the content and the response being the actual HTTP response
 * 	// object. This can be used to get data like content length
 *
 * }).catch((error) => {
 * 	//Error handling logic
 * });
 */
export class LoadLogCommand {
	/**
	 * Execute
	 * Return a Promise that will load content from the connection + log paramter
	 * starting at a specified point.
	 * Metric for starting point  = Bytes
	 *
	 * @param {Connection} connection Connection to load content from
	 * @param {Log} log Log file on the connection to load
	 * @param {Integer} startPoint The starting point to load content from in Bytes
	 * @return {Promise} A promise to asynchronously respond to the execution of this code
	 */
	static execute(connection, log, startPoint = 0) {
		Log.info("Loading Log content from: " + connection.protocol + "://" + connection.hostname + ":" + connection.port + "/" + log.filename)

		var params = {
			baseUrl: connection.protocol + "://" + connection.hostname + ":" + connection.port,
			uri: log.filename,
			auth: {
				user: connection.username,
				password: connection.password
			},
			strictSSL: false,
			method: "GET",
			headers: {
				Depth: 1,
				Range: "bytes=" + startPoint + "-"
			}
		}

		return new Promise(
			function(resolve, reject) {
				request(params, function(err, res, body) {
					if (err) {
						reject(err)
					}

					if (res.statusCode >= 400) {
						reject(res.statusMessage)
					}

					resolve({body: body, response: res})
				})
			}
		);
	}
}
