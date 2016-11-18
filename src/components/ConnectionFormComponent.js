import React from "react"
import AppModel from "../models/AppModel"
import {SaveConnectionsCommand} from "../commands/SaveConnectionsCommand"

/**
 * Class to represent the Connection Form Component
 *
 * @extends {React.Component}
 * @example
 * import {ConnectionFormComponent} from "./components/ConnectionFormComponent"
 *
 * render () {
 * 	return (
 * 		<ConnectionFormComponent connection={connection} />
 * 	)
 * }
 */
export class ConnectionFormComponent extends React.Component {

	/**
	 * Constructor
	 * Responsible for attaching the connection property to the state, so that
	 * updates to the connection will refresh the display. Bind the handleChange
	 * and handleSubmit methods to the current instance of this class
	 *
	 * @override
	 * @param {object} state state of this component
	 * @return {null}
	 */
	constructor(props) {
			super(props)
			this.state = {connection: props.connection}

			this.handleChange = this.handleChange.bind(this)
			this.handleSubmit = this.handleSubmit.bind(this)
	}

	/**
	 * Handle changes to the form by upate the connection in the state
	 *
	 * @param {Event} event DOM Event
	 * @return {null}
	 */
	handleChange(event) {
		/**
		 * Update the connection attribute with the value, the name of the form
		 * elements should match the connection attributes
		 */
		this.state.connection[event.target.name] = event.target.value

		/**
		 * If the parameter being changed in the URL variable, execute the parseURL
		 * method on the connection model.
		 */
		if (event.target.name === "url") {
			this.state.connection.parseURL()
		}

		this.setState({connection: this.state.connection})
	}

	/**
	 * Submit Form
	 * Connections are updated in memory automatically on change, so all that
	 * needs to happen on submiting the form is executing the SaveConnectionsCommand
	 * to make the conenctions permanent and update the state to not a have
	 * a connection or second pane
	 *
	 * @return {null}
	 */
	handleSubmit () {
		"use strict"

		SaveConnectionsCommand.execute(AppModel.getValue("connections"))

		/**
		 * Update State
		 * - Disable Second Pane
		 * - Disable Current Connection
		*/
		AppModel.setData({view: AppModel.getConstant("views").VIEW_CONNECTION_LIST, connection: null})
	}

	/**
	 * Render
	 * This method will return the JSX necessary for this component.
	 *
	 * @override
	 * @return {JSX} JSX for this component
	 */
	render () {
		"use strict"
		return (
			<div className="container">
				<form>
					<div className="row">
						<div className="input-field col s12">
							<input id="name"name="name" type="text" className="validate" placeholder="Name" onChange={this.handleChange} value={this.state.connection.name} />
							<label className="active" htmlFor="name">Name</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="url" name="url" type="text" className="validate" placeholder="URL" onChange={this.handleChange} value={this.state.connection.url} />
							<label className="active" htmlFor="url">URL</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="username" name="username" type="text" className="validate" placeholder="Username" onChange={this.handleChange} value={this.state.connection.username} />
							<label className="active" htmlFor="username">Username</label>
						</div>
					</div>
					<div className="row">
						<div className="s6 col">

						</div>
						<div className="s6 col">
							<a href="#!" className=" btn-large waves-effect waves-dark purple darken-4" onClick={this.handleSubmit}>
								Save
							</a>
						</div>
					</div>
				</form>
			</div>
		)
	}
}
