const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Be cautious with this in production, but useful for quick setup
      contextIsolation: false, // Be cautious with this in production
    },
  });

  // Load the Vue app
  // In development, load from Vite dev server.
  // In production, load the built index.html.
  if (!app.isPackaged) {
    win.loadURL('http://localhost:5173/'); // Default Vite dev server URL
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, 'dist/index.html'));
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});