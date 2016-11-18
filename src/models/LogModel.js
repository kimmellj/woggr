import URL from 'url-parser'

export class LogModel {
	/**
	 * @todo add validation
	 */
	constructor(rawLog) {
		if (!rawLog.id) {
			throw "Log requires at least the id property"
		}

		if (!rawLog.filename) {
			throw "Log requires at least the filename property"
		}

		this.id = rawLog.id
		this.filename = rawLog.filename
		this.date = new Date(rawLog.date) || false
	}
}
