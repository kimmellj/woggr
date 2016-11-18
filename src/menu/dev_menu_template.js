import {app, BrowserWindow} from "electron";

export var devMenuTemplate = {
	label: "Development",
	submenu: [{
		label: "Reload",
		accelerator: "CmdOrCtrl+R",
		click: function() {
			"use strict"
			BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
		}
	}, {
		label: "Toggle DevTools",
		accelerator: "Alt+CmdOrCtrl+I",
		click: function() {
			"use strict"
			BrowserWindow.getFocusedWindow().toggleDevTools();
		}
	}, {
		label: "Quit",
		accelerator: "CmdOrCtrl+Q",
		click: function() {
			"use strict"
			app.quit();
		}
	}]
};
