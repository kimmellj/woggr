let i = 1
const VIEWS = {
	SECOND_PANE_FORM: i++, // 1
	SECOND_PANE_LOG_LIST: i++, //2

	VIEW_CONNECTION_LIST: i++, //3
	VIEW_CONNECTION_FORM: i++, //4
	VIEW_LOG_LIST: i++, //5
	VIEW_LOG: i++ //6
}

const REFRESH_INTERVAL = 10000

class AppModel {

	constructor () {
		this.constants = {
			views: VIEWS,
			refreshInterval: REFRESH_INTERVAL
		}

		this.data = {
			view: VIEWS.VIEW_CONNECTION_LIST,
			connections: [],
			connection: null,
			logs: [],
			log: null,
			connectionWaitingForPassword: null,
			logContentIntervalID: null,
			logConent: null,
			logLength: 0
		}

		/**
		 * Build an empty list of subscribers
		 * @type {Array}
		 */
		this.subscribers = []
	}

	subscribe (callback) {
		this.subscribers.push(callback)
		return this.data
	}

	getValue (key) {
		return this.data[key]
	}

	setValue (key, value) {
		this.data[key] = value

		this.updateSubscribers()
	}

	getConstant (key) {
		return this.constants[key]
	}

	setData (params) {
		for (let key in params) {
			this.data[key] = params[key]
		}

		this.updateSubscribers()
	}

	updateSubscribers () {
		for (let subscriber of this.subscribers) {
			subscriber.setState(this.data)
		}
	}

	getData () {
		return this.data
	}
}

let appModel = new AppModel()

export default appModel
