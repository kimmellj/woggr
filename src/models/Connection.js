import URL from 'url-parser'

const DWREPath = "/on/demandware.servlet/webdav/Sites/Logs"

export class Connection {
	/**
	 * @todo add validation
	 */
	constructor(rawConnection) {
		if (!rawConnection.id) {
			throw "Connection requires at least the id property"
		}

		this.id = rawConnection.id
		this.name = rawConnection.name
		this.url = rawConnection.url || ""
		this.username = rawConnection.username || ""
		
		this.parseURL()
	}

	parseURL() {

		if (this.url.indexOf("http") === -1) {
			if (this.url.indexOf("://") !== -1) {
				this.url = "https" + this.url
			} else {
				this.url = "https://" + this.url
			}
		}

		let urlObj = URL.parse(this.url);

		this.hostname = urlObj.hostname || null

		this.protocol = urlObj.protocol.replace(":", "") || "https"
		this.port = urlObj.port || ((this.protocol === "https") ? 443 : 80 )
		this.path = urlObj.path || null
	}

	toObject() {
		return {
			id: this.id,
			name: this.name,
			url: this.url,
			username: this.username
		}
	}
}
