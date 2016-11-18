import React from "react"

/**
 * Class to represent the Back Arrow for the application
 *
 * @extends {React.Component}
 * @example
 * import {BackArrowComponent} from "./components/BackArrowComponent"
 *
 * render () {
 * 	return (
 * 		<BackArrowComponent />
 * 	)
 * }
 */
export class BackArrowComponent extends React.Component {
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
			<div className="row">
				<div className="col s3">
					<a className="btn-floating btn-large waves-effect waves-light waves-light purple darken-4 nav-button" onClick={this.props.action}>
						<i className="material-icons">arrow_back</i>
					</a>
				</div>
			</div>
		)
	}
}
