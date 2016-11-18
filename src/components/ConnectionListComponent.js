import React from "react"
import AppModel from "../models/AppModel"

/**
 * Class to represent the Connection List Component. This component will render
 * a list of connections with actions buttons to perform various actions on
 * each connection.
 *
 * @extends {React.Component}
 * @example
 * import {ConnectionListComponent} from "./components/ConnectionListComponent"
 *
 * render () {
 * 	return (
 * 		<ConnectionListComponent connections={connections} launchConnection={this.launchConnection} editConnection={this.editConnection} deleteConnection={this.deleteConnection} />
 * 	)
 * }
 */
export class ConnectionListComponent extends React.Component {

	/**
	 * Render
	 * This method will return the JSX necessary for this component.
	 *
	 * @override
	 * @return {JSX} JSX for this component
	 */
	render () {
		"use strict"

		var connections = this.props.connections.map((connection, index) => {
			return (
				<div className="card-panel connection-list-item grey lighten-5" key={index + 1}>
					<div className="row">
						<div className="col l9">
							<h5>{connection.name}</h5>
							<p className="truncate">
								{connection.username}@{connection.hostname}
							</p>
							<p className="truncate">
								{connection.path}
							</p>
						</div>
						<div className="col l3">
							<a href="#!" className="btn-floating btn-large waves-effect waves-light purple darken-4" onClick={() => this.props.launchConnection(connection)}>
								<i className="material-icons">open_in_new</i>
							</a>
							<a href="#!" className="btn-floating btn-large waves-effect waves-light purple darken-4" onClick={() => this.props.editConnection(connection)}>
								<i className="material-icons">mode_edit</i>
							</a>
							<a href="#!" className="btn-floating btn-large waves-effect waves-light red darken-3" onClick={() => this.props.deleteConnection(connection)}>
								<i className="material-icons">delete</i>
							</a>
						</div>
					</div>
				</div>
			)
		}, this)

		return (
			<div className="container">
				<div className="connection-list-pane">
					{connections}
				</div>
			</div>
		)
	}
}
