import React from "react"
import AppModel from "../models/AppModel"

/**
 * Class to represent the Password Prompt Component. This component will render
 * the password prompt modal.
 * each connection.
 *
 * @todo Handle failed password better by testing the password with a request first
 * @extends {React.Component}
 * @example
 * import {PasswordPromptComponent} from "./components/PasswordPromptComponent"
 *
 * render () {
 * 	return (
 * 		<PasswordPromptComponent submitPassword={submitPassword} />
 * 	)
 * }
 */
export class PasswordPromptComponent extends React.Component {
	/**
	 * Constructor
	 *
	 * Set the initial state of this component to be a blank password
	 *
	 * @param {Object} props Properties for this component
	 */
	constructor(props) {
		"use strict"

		super(props);

		this.state = {
			password: ""
		}
	}

	/**
	 * Handle the change to the password form field by updating the state password
	 * with the value of the input.
	 *
	 * @param {Event} event DOM Event
	 */
	handleChange (event) {
		"use strict"

		this.setState({
			password: event.target.value
		})
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
			<div id="password-modal" className="modal">
				<div className="modal-content">
						<h4>Connection Password</h4>
						<p>Please enter your password to make this connection?</p>
						<input type="password" name="password" defaultValue={this.state.password} onChange={(event) => this.handleChange(event)} />
				</div>
				<div className="modal-footer">
						<a onClick={() => {this.props.submitPassword(this.state.password)}} href="#!" className="waves-effect waves-black btn-flat">Submit</a>
				</div>
			</div>
		)
	}
}
