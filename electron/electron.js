const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');
let mainWindow;
function createWindow() {
	mainWindow = new BrowserWindow({ width: 414, height: 736, resizable: true });
	//  resizable: false
	mainWindow.webContents.openDevTools();
	mainWindow.setMenuBarVisibility(false);
	mainWindow.loadURL('http://localhost:3000');
	// mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
	mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
