const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const path = require('path');
const url = require('url');

let win;

let createWindow = () => {
    win = new BrowserWindow(
        //Required for require() to be used in html
        {
            webPreferences: {
                nodeIntegration: true
            }
        }
    );

    win.loadURL(url.format(
        {
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }
    ));

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    })

};

app.on('ready', createWindow);

/*Mac specific setting*/
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

/*Mac specific setting*/
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
