import React from "react"
import {ConnectionLogComponent} from "./ConnectionLogComponent"
import {ProgressIndicatorComponent} from "./ProgressIndicatorComponent"
import AppModel from "../models/AppModel"

/**
 * Class to represent the Connection Log List Component. This component will render
 * a list of log files for a connection.
 * each connection.
 *
 * @extends {React.Component}
 * @example
 * import {ConnectionLogListComponent} from "./components/ConnectionLogListComponent"
 *
 * render () {
 * 	return (
 * 		<ConnectionLogListComponent error={error} logs={logs} />
 * 	)
 * }
 */
export class ConnectionLogListComponent extends React.Component {

	/**
	 * Render
	 * This method will return the JSX necessary for this component.
	 *
	 * @override
	 * @return {JSX} JSX for this component
	 */
	render () {
		"use strict"
		let logs = null

		/**
		 * If there is an error set logs to that, if there are logs map the array
		 * to a function that will build the JSX for each log file, otherwise show
		 * a message that there aren't any logs
		 */
		if (this.props.error !== false) {
			logs = (
				<li className="collection-item red-text text-darken-2 red lighten-5">{this.props.error}</li>
			)
		} else if (this.props.logs.length > 0) {
			logs = this.props.logs.map((log) => {
				var shortName = log.filename.split("/").pop();

				return (
					<li className="collection-item" key={log.id}>
						<a href="#!" className="black-text" onClick={() => this.props.selectLog(log)}>
							<span className="log-file">{shortName}</span><br />
							<span className="log-date">{log.date.toISOString()}</span>
						</a>
					</li>
				)
			})
		} else {
			logs = (
				<li className="collection-item grey-text text-darken-2 amber lighten-5">No Logs</li>
			)
		}

		if (this.props.logs === false) {
			return (
				<ProgressIndicatorComponent />
			)
		} else {
			return (
				<ul className="collection log-list">
					{logs}
				</ul>
			)
		}
	}
}
