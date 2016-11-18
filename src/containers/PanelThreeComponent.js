import React from "react"
import AppModel from "../models/AppModel"
import {ConnectionLogComponent} from "../components/ConnectionLogComponent"

/**
 * Class representing the Third Panel Component
 * The third panel's exclusive purpose is to display the currently loaded
 * log contents
 *
 * @extends {React.Component}
 * @example
 * import {PanelThreeComponent} from "./components/PanelThreeComponent"
 *
 * render () {
 * 	return (
 * 		<PanelThreeComponent />
 * 	)
 * }
 */
export class PanelThreeComponent extends React.Component {
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
	 * Render
	 * This method will return the JSX necessary for this component. This component
	 * should only render when the user is viewing a log and it will return the
	 * JSX ConnectionLogComponent
	 *
	 * @override
	 * @return {JSX} JSX for this component
	 */
	render () {
		"use strict"

		if (this.state.view === AppModel.getConstant("views").VIEW_LOG) {
			return (
				<div className="col l8">
					<div className="container scrollable">
						<ConnectionLogComponent logContent={this.state.logContent} />
					</div>
				</div>
			)
		}

		return  null
	}
}
