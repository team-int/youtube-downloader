import electron from 'electron';
import updater from 'update-electron-app';
import path from 'path';
if (require('electron-squirrel-startup')) process.exit(0);
if (process.platform == 'win32') {
    updater({
        notifyUser: false
    });
}
function createWindow() {
    const window:electron.BrowserWindow = new electron.BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    window.loadFile(path.join(__dirname, 'index.html'));
}
electron.app.whenReady().then(() => {
    createWindow();
    electron.app.on('activate', () => {
        if (electron.BrowserWindow.getAllWindows().length == 0) createWindow();
    });
    electron.app.on('window-all-closed', electron.app.quit);
});