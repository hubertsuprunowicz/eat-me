const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
function createWindow() {
	mainWindow = new BrowserWindow({ width: 418, height: 752, resizable: false, title: "EatMe" });
	mainWindow.setMenuBarVisibility(false);
	mainWindow.loadURL('http://localhost:3000');
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
