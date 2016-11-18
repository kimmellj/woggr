/**
 * Class representing the Command Design Pattern
 * Commands are simple in this application and are only required to define a
 * static execute method.
 *
 * @example
 * import {Command} from "./src/components/Command"
 */
export class Command {

	/**
	 * Main Execute method
	 * This method must be overwritten by a child class
	 *
	 * @throws {Error} throw error if this method ever executes
	 */
	static execute() {
		throw("The static method execut must be overwritten")
	}
}
