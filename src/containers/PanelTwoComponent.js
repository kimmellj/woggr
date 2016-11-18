import React from "react"
import Log from "loglevel"

import AppModel from "../models/AppModel"

import {ConnectionFormComponent} from "../components/ConnectionFormComponent"
import {ConnectionLogListComponent} from "../components/ConnectionLogListComponent"
import {BackArrowComponent} from "../components/BackArrowComponent"

import {LoadLogCommand} from "../commands/LoadLogCommand"
import {LoadLogListCommand} from "../commands/LoadLogListCommand"

/**
 * Class representing the Second Panel Component
 * The second panel has two purposes:
 * - display connection form
 * - display list of logs retrieved from a connection
 *
 * @extends {React.Component}
 * @example
 * import {PanelTwoComponent} from "./components/PanelTwoComponent"
 *
 * render () {
 * 	return (
 * 		<PanelTwoComponent />
 * 	)
 * }
 */
export class PanelTwoComponent extends React.Component {

	/**
	 * Constructor
	 * Responsible for attaching the state of this copmonent to the Application Model
	 *
	 * @override
	 * @param {object} state state of this component
	 * @return {null}
	 */
	constructor(state) {
		"use strict"

		super(state);

		/**
		 * Set Initial state
		 */
		this.state = AppModel.subscribe(this)
	}

	/**
	 * Go back
	 * Update State to:
	 * - View the Connection List
	 * - Unset the current connection
	 * @return {null}
	 */
	goBackForm () {
		"use strict"

		AppModel.setData({
			view: AppModel.getConstant("views").VIEW_CONNECTION_LIST,
			connection: null
		})
	}

	/**
	 * Return from viewing a log
	 * This is accomplished by clearing the repeat interval and updating
	 * the state to remove the log and content from memory and update the view
	 * to show only the list of logs
	 *
	 * @return {null}
	 */
	goBackLog () {
		"use strict"

		/**
		 * Stop refreshing the log content
		 */
		window.clearInterval(AppModel.getValue("logContentIntervalID"))

		/**
		 * Update State
		 * - empty the log content
		 * - set the current log to false
		*/
		AppModel.setData({
			view: AppModel.getConstant("views").VIEW_LOG_LIST,
			logContent: false,
			log: false
		})
	}


	/**
	 * Select log
	 * The onClick for a log file will open that log file in the third pane
	 * This is accomplished by:
	 * - Updating the state with the log to view
	 * - Requesting the inital log content
	 * - Creating an interval to request new log information with
	 *
	 * @param  {String} log Log file to get content for
	 * @return {null}
	 */
	selectLog (log) {
		"use strict"

		Log.info("Select Log: " + log)

		/**
		 * Ensure there is not already a repeating process
		 */
		window.clearInterval(AppModel.getValue("logContentIntervalID"))


		/**
		 * Reset the current logConent
		 */
		AppModel.setData({
			logContent: false,
			logLength: 0
		})

		/**
		 * Create a local variable to request log content that we can execute
		 * on a repeat interval
		 *
		 * @param  {Log} log Log File to load content for
		 * @param  {Boolean} append Should the log content be replaced or appended?
		 * @return {function} Executable function
		 */
		let requestLogContent = (log, append) => {
			LoadLogCommand.execute(AppModel.getValue("connection"), log, AppModel.getValue("logLength")).then((data) => {
				let content = data.body
				let response = data.response
				let contentLength = parseInt(response.headers['content-length'], 10)
				let currentLogLength = AppModel.getValue("logLength")
				let currentContent = AppModel.getValue("logContent")

				AppModel.setData({
					logContent: (append ? (currentContent+ content) : content),
					logLength: (append ? (currentLogLength + contentLength): contentLength)
				})
			}).catch((error) => {
				/**
				 * @todo handle this better
				 */
				Log.warn(error)
				if (error.stack) {
					Log.error(error.stack)
				}
			})
		}

		/**
		 * Execute the first request for log content, dictating that the content
		 * should be replaced
		 */
		requestLogContent(log, false);

		Log.info("Set interval to request content for: " + AppModel.getConstant("refreshInterval"))

		/**
		 * Create an interval that will execute on the refresh interval, each
		 * execution will re-request the log content
		 * @type {[type]}
		 */
		let logContentIntervalID = window.setInterval(function() {
			requestLogContent(log, true) // append
		}, AppModel.getConstant("refreshInterval"))


		/**
		 * Update State
		 * - Log to view
		 * - Inverval ID for the refresh loop
		 * - View: View Log
		*/
		AppModel.setData({
			log: log,
			logContentIntervalID: logContentIntervalID,
			view: AppModel.getConstant("views").VIEW_LOG
		})
	}

	/**
	 * Reload the list of log files from the currently selected connection
	 */
	reloadList () {
		LoadLogListCommand.execute(AppModel.getValue("connection")).then((logs) => {
			AppModel.setData({
				logs: logs,
				loadLogListError: false
			})
		}).catch((error) => {
			Log.error(error)
			AppModel.setData({
				connection: connection,
				loadLogListError: "" + error,
				logs: null
			})
		})
	}

	/**
	 * Render
	 * This method will return the JSX necessary for this component. This component
	 * should only render content depeding on which view is currently active.
	 * The three applicable states are: VIEW_CONNECTION_FORM, VIEW_LOG_LIST and VIEW_LOG
	 * VIEW_CONNECTION_FORM
	 * - BackArrowComponent
	 * - ConnectionFormComponent
	 * VIEW_LOG_LIST || VIEW_LOG
	 * - ConnectionLogListComponent
	 *
	 * @override
	 * @return {JSX} JSX for this component
	 */
	render () {
		"use strict"

		if (this.state.view === AppModel.getConstant("views").VIEW_CONNECTION_FORM) {
			return (
				<div className="col l4">
					<div className="container scrollable">
						<BackArrowComponent action={this.goBackForm}/>
						<ConnectionFormComponent connection={this.state.connection} />
					</div>
				</div>
			)
		} else if (this.state.view === AppModel.getConstant("views").VIEW_LOG_LIST) {
			return (
				<div className="col l4">
					<div className="container scrollable">
						<div className="row">
							<div className="col s3 offset-s9">
								<a href="#!" className="btn-floating btn-large waves-effect waves-light purple darken-4 nav-button" onClick={() => this.reloadList()}>
									<i className="material-icons">update</i>
								</a>
							</div>
						</div>
						<ConnectionLogListComponent error={this.state.loadLogListError} logs={this.state.logs} selectLog={this.selectLog}  />
					</div>
				</div>
			)
		} else if (this.state.view === AppModel.getConstant("views").VIEW_LOG) {
			return (
				<div className="col l4">
					<div className="container scrollable">
						<BackArrowComponent action={this.goBackLog}/>
						<ConnectionLogListComponent error={this.state.loadLogListError} logs={this.state.logs} selectLog={this.selectLog}  />
					</div>
				</div>
			)
		}

		return null
	}
}
