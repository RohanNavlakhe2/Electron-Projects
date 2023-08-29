const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
//const {app, BrowserWindow} = require('electron')
const path = require('path');
const url = require('url');


let win;

function createWindow () {

    win = new BrowserWindow({width: 800, height: 600,
        //Required for require() to be used in html
        webPreferences:{
            nodeIntegration:true
        }
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.maximize();


    win.on('closed', () => {
        win = null
    });

    //win.webContents.openDevTools();
}

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
