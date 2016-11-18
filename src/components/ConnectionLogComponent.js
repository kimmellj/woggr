import React from "react"
import AppModel from "../models/AppModel"
import {ProgressIndicatorComponent} from "./ProgressIndicatorComponent"

/**
 * Class to represent the Connection List Component. This component will render
 * a list of connections with actions buttons to perform various actions on
 * each connection.
 *
 * @extends {React.Component}
 * @example
 * import {ConnectionLogComponent} from "./components/ConnectionLogComponent"
 *
 * render () {
 * 	return (
 * 		<ConnectionLogComponent logContent={logContent} />
 * 	)
 * }
 */
export class ConnectionLogComponent extends React.Component {

	/**
	 * Method to be called when the component updates. When this happens, scroll
	 * to the bottom of the log content, so users won't have to scroll down
	 * to see new content.
	 *
	 * @param {Object} prevProps Previous Properties of this Component before the update
	 * @param {Object} prevState Previous State of this Component before the update
	 */
	componentDidUpdate(prevProps, prevState) {
		$("#log-content").parent().scrollTop($("#log-content").height())
	}

	/**
	 * Render
	 * This method will return the JSX necessary for this component.
	 *
	 * @override
	 * @return {JSX} JSX for this component
	 */
	render() {
		"use strict"

		let content = ""

		if (this.props.logContent === false) {
			content = (<ProgressIndicatorComponent />)
		} else {
			content = (<pre>{this.props.logContent}</pre>)
		}

		return (
			<div id="log-content" className="container">
				{content}
			</div>
		)
	}
}
