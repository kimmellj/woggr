import React from "react"

/**
 * Class to represent the Progress Indicator Component. This component will render
 * a progress spinner that can be used in other componets.
 *
 * @extends {React.Component}
 * @example
 * import {ProgressIndicatorComponent} from "./components/ProgressIndicatorComponent"
 *
 * render () {
 * 	return (
 * 		<ProgressIndicatorComponent />
 * 	)
 * }
 */
export class ProgressIndicatorComponent extends React.Component {

	/**
	 * Render
	 * This method will return the JSX necessary for this component.
	 *
	 * @override
	 * @return {JSX} JSX for this component
	 */
	render() {
		"use strict"

		return (
			<div className="preloader-wrapper big active">
				<div className="spinner-layer spinner-blue">
						<div className="circle-clipper left">
								<div className="circle"></div>
						</div><div className="gap-patch">
								<div className="circle"></div>
						</div><div className="circle-clipper right">
								<div className="circle"></div>
						</div>
				</div>

				<div className="spinner-layer spinner-red">
						<div className="circle-clipper left">
								<div className="circle"></div>
						</div><div className="gap-patch">
								<div className="circle"></div>
						</div><div className="circle-clipper right">
								<div className="circle"></div>
						</div>
				</div>

				<div className="spinner-layer spinner-yellow">
						<div className="circle-clipper left">
								<div className="circle"></div>
						</div><div className="gap-patch">
								<div className="circle"></div>
						</div><div className="circle-clipper right">
								<div className="circle"></div>
						</div>
				</div>

				<div className="spinner-layer spinner-green">
						<div className="circle-clipper left">
								<div className="circle"></div>
						</div><div className="gap-patch">
								<div className="circle"></div>
						</div><div className="circle-clipper right">
								<div className="circle"></div>
						</div>
				</div>
			</div>
		)
	}
}
