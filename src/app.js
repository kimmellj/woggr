import React from "react"
import ReactDOM from "react-dom"
import Log from "loglevel"

import {AppComponent} from "./components/AppComponent"

Log.enableAll()

document.addEventListener("DOMContentLoaded", function() {
	"use strict"

	ReactDOM.render(React.createElement(AppComponent, {}), document.getElementById("app"))
});
