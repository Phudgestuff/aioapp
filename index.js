const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require('path');
const sortJson = require('./scripts/sortJsonPaths.js')

function createWindow() {

    // get mouse position
    const mousePoint = screen.getCursorScreenPoint();

    // get the display where the mouse is
    const display = screen.getDisplayNearestPoint(mousePoint);

    const winWidth = 1600;
    const winHeight = 1000;

    // calculate centred position
    const x = display.bounds.x + (display.bounds.width - winWidth) / 2;
    const y = display.bounds.y + (display.bounds.height - winHeight) / 2;

    const win = new BrowserWindow({
        x,
        y,
        width: 1600,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    win.loadFile("index.html");
    win.setMenu(null);
    //win.webContents.openDevTools(); // open DevTools for debugging

    // handler for retrieve, returns sorted list of paths
    ipcMain.handle('retrieve', (event, string) => {
        return sortJson(string);
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
