import React from "react"

import AppModel from "../models/AppModel"

/**
 * Components
 */
import {PanelOneComponent} from "../containers/PanelOneComponent"
import {PanelTwoComponent} from "../containers/PanelTwoComponent"
import {PanelThreeComponent} from "../containers/PanelThreeComponent"

/**
 * Class representing the application
 * The application is comprised of 3 "Panes"
 * That contain various lists or data.
 *
 * @extends {React.Component}
 * @example
 * import {AppComponent} from "./components/AppComponent"
 * import ReactDOM from "react-dom"
 *
 * ReactDOM.render(React.createElement(AppComponent, {}), document.getElementById("app"))
 */
	export class AppComponent extends React.Component {

	/**
	 * Render the application
	 * The application is composed of 3 panes
	 * @return {jsx} JSX representing the high level application structure
	 */
	render () {
		"use strict"

		return (
			<div className="container">
				<div className="row">
					<PanelOneComponent />
					<PanelTwoComponent />
					<PanelThreeComponent />
				</div>
			</div>
		)
	}
}
