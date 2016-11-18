const http = require('http')
const Mustache = require('Mustache')
const fs = require('fs')

const PORT = 8080
const phrases = [
	"Does it often snow in the winter in Massachusetts?",
	"Do you think it's going to rain tomorrow?",
	"Has your brother been to California?",
	"He never gives me anything.",
	"Sometimes I go to sleep at 11PM, sometimes at 11:30PM.",
	"Sorry, we only accept Cash."
]

class TestServer {

	getRandomArbitrary(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	readRangeHeader(range, totalLength) {
		/*
		 * Example of the method 'split' with regular expression.
		 *
		 * Input: bytes=100-200
		 * Output: [null, 100, 200, null]
		 *
		 * Input: bytes=-200
		 * Output: [null, null, 200, null]
		 */

		if (range == null || range.length == 0)
			return null;

		var array = range.split(/bytes=([0-9]*)-([0-9]*)/);
		var start = parseInt(array[1]);
		var end = parseInt(array[2]);
		var result = {
			Start: isNaN(start) ? 0 : start,
			End: isNaN(end) ? (totalLength - 1) : end
		};

		if (!isNaN(start) && isNaN(end)) {
			result.Start = start;
			result.End = totalLength - 1;
		}

		if (isNaN(start) && !isNaN(end)) {
			result.Start = totalLength - end;
			result.End = totalLength - 1;
		}

		return result;
	}

	handleRequest(request, response) {
		var path = request.url

		var range = this.readRangeHeader(request.headers['range'], Buffer.byteLength(this.content, 'utf8'))

		if (path === "/") {
			fs.readFile('./app/file-list.html', (err, data) => {
			  if (err) throw err;
			  var rendered = Mustache.render("" + data, {
					files: [{
						"fileURL": "/foo/bar/test/foobar.log",
						"fileName": "Some Log File Name (1)",
						"date": "Wed, 21 Oct 2015 07:28:00 GMT"
					}]
				});
				response.end(rendered)
			});

		} else if (path === "/foo/bar/test/foobar.log") {
			if (range !== null) {
				var buffer = new Buffer(this.content);

				response.end(buffer.slice(range.Start, range.End))
			} else {
				response.end(this.content)
			}
		} else {
			response.end('It Works!! Path Hit: ' + request.url)
		}
	}

	constructor() {
		this.content = phrases[this.getRandomArbitrary(0, phrases.length)]

		setInterval(() => {
			this.content = this.content + "\n" + phrases[this.getRandomArbitrary(0, phrases.length)]
		}, 2000);

		let server = http.createServer((request, response) => {
			this.handleRequest(request, response)
		})

		server.listen(PORT, function() {
			//Callback triggered when server is successfully listening. Hurray!
			console.log("Server listening on: http://localhost:%s", PORT)
		});
	}
}

var testServer = new TestServer()
