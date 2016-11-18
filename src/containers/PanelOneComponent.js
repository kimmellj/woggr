import React from "react"
import Log from "loglevel"

import AppModel from "../models/AppModel"
import {Connection} from "../models/Connection"

import {ConnectionListComponent} from "../components/ConnectionListComponent"
import {PasswordPromptComponent} from "../components/PasswordPromptComponent"

import {LoadConnectionsCommand} from "../commands/LoadConnectionsCommand"
import {SaveConnectionsCommand} from "../commands/SaveConnectionsCommand"
import {LoadLogListCommand} from "../commands/LoadLogListCommand"

/**
 * Class representing the First Panel Component
 * The first pane's exclusive purpose is to display the list of the connections
 * and any actions that a connection may have.
 *
 * @extends {React.Component}
 * @example
 * import {PanelOneComponent} from "./components/PanelOneComponent"
 *
 * render () {
 * 	return (
 * 		<PanelOneComponent />
 * 	)
 * }
 */
export class PanelOneComponent extends React.Component {

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
	 * Add Connection
	 * This method facilitates creating a new connection.
	 * - Create a new blank Connection Object
	 * - Append the new connection to the connection list
	 * - Set state variables to dictate that the Second Panel Form should be shown,
	 * also update the current connection list and connection
	 * @return {null}
	 */
	addConnection () {
		"use strict"

		/**
		 * Get a handle on the connection list, so that we can update and save
		 * back to the state
		 * @type {Array}
		 */
		var connections = AppModel.getData().connections

		/**
		 * Create a blank Connection with the next available ID
		 * @type {Connection}
		 */
		var connection = new Connection({id: this.getNextID()})

		connections.push(connection)

		/**
		 * Save State
		 * - Show Second Pane Form
		 * - New Connection list
		 * - New Connection
		 */
		AppModel.setData({
			view: AppModel.getConstant("views").VIEW_CONNECTION_FORM,
			connections: connections,
			connection: connection
		})
	}

	/**
	 * Edit Connecton
	 * Update the state with the connection to be updated and the view should be
	 * the connection form
	 *
	 * @param  {Connection} connection Connection to update
	 * @return {null}
	 */
	editConnection (connection) {
		"use strict"

		AppModel.setData({
			view: AppModel.getConstant("views").VIEW_CONNECTION_FORM,
			connection: connection
		})
	}

	/**
	 * Delete Connection
	 * Delete a connection from the list.
	 * - Remove the connection from the current
	 * - execute the Save Connections Command
	 * - Set set state with new connection list and disable the second pane
	 *
	 * @param  {Connection} connection Connection to delete
	 * @return {null}
	 */
	deleteConnection (connection) {
		"use strict"

		var connections = AppModel.getData().connections
		connections.splice(connections.indexOf(connection), 1)

		SaveConnectionsCommand.execute(connections)

		AppModel.setData({connections: connections})
	}

	/**
	 * Launch Connection
	 * Update the value of the connection waiting for a  password to the connection
	 * parameter passed in. The Password prompt modal should then be launched
	 * to request the password for the connection from the user.
	 *
	 * @param  {Connection} connection Connection to launch
	 * @return {null}
	 */
	launchConnection (connection) {
		"use strict"

		Log.info("Launching connection ...")
		Log.debug(connection)

		/**
		 * Set the connection that is waiting for a password
		 * @type {Connection}
		 */
		AppModel.setValue("connectionWaitingForPassword", connection)

		/**
		 * Open the Modal Window
		 */
		$('#password-modal').openModal();
	}

	/**
	 * Get Next ID
	 * Loop across the list of connections and get the next available ID, this
	 * assumes an ascending numerical key set
	 * @return {Integer} Next Available Key
	 */
	getNextID () {
		"use strict"

		/**
		 * Create a reference for the largest ID and then loop across the current
		 * list of conenctions updating what the largest id is.
		 * @type {Number}
		 */
		var largestID = 0
		for (let connection of AppModel.getData().connections) {
			if (connection.id > largestID) {
				largestID = connection.id
			}
		}

		return largestID + 1
	}

	/**
	 * Method to execute when the component mounts
	 * The Panel needs to load the list of connections from persistent storage
	 * once the list is loaded, it doesn't need to be loaded again as all actions
	 * will occur on the list in memory and the list on persistent storage
	 *
	 * @override
	 */
	componentDidMount () {
		var connections = LoadConnectionsCommand.execute().then((connections) => {
			AppModel.setData({
				connections: connections
			})
		}).catch((error) => {
			AppModel.setData({
				loadConnectionsError: "" + error
			})
		})
	}

	/**
	 * Submit Password
	 * This method will be called by the open dialog when the user clicks submit
	 * on the form to submit their password
	 * @param  {String} password Password to attach to the connection in memory
	 * @return {null}
	 */
	submitPassword (password) {
		/**
		 * Update the hungry connection that is waiting for a password
		 * @type {String}
		 */
		let connection = AppModel.getValue("connectionWaitingForPassword")
		connection.password = password

		AppModel.setData({
			view: AppModel.getConstant("views").VIEW_LOG_LIST,
			connection: connection,
			logs: false,
			loadLogListError: false
		})

		/**
		 * Request the list of logs for this connection
		 */
		LoadLogListCommand.execute(connection).then((logs) => {
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

		/**
		 * Close the Modal Window
		 */
		$('#password-modal').closeModal();
	}

	/**
	 * Render
	 * This method will return the JSX necessary for this component. This component
	 * should only render when the user is viewing: the connection list, connection form
	 * or log list and it will return the JSX ConnectionListComponent and PasswordPromptComponent
	 *
	 * @override
	 * @return {JSX} JSX for this component
	 */
	render () {
		"use strict"

		if (
			this.state.view === AppModel.getConstant("views").VIEW_CONNECTION_LIST ||
			this.state.view === AppModel.getConstant("views").VIEW_CONNECTION_FORM ||
			this.state.view === AppModel.getConstant("views").VIEW_LOG_LIST
		) {
			return (
				<div className="col l4">
					<div className="container scrollable">
						<div className="row">
							<div className="col s3 offset-s9">
								<a href="#!" className="btn-floating btn-large waves-effect waves-light blue lighten-2 nav-button" onClick={() => this.addConnection()}>
									<i className="material-icons">add</i>
								</a>
							</div>
						</div>
						<ConnectionListComponent addConnection={this.addConnection} deleteConnection={this.deleteConnection} editConnection={this.editConnection} launchConnection={this.launchConnection} connections={this.state.connections} />
					</div>
					<PasswordPromptComponent submitPassword={this.submitPassword} />
				</div>
			)
		}

		return null
	}
}
