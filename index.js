const { app, BrowserWindow, Menu, ipcMain} = require('electron')
const path = require('path')
const env = 'development';
const isWin32 = process.platform;

const isDev = process.env.NODE_ENV !== "production" ? true : false;

let win;
const createWindow = () => {
  win = new BrowserWindow({
    width: isDev ? 800 : 400,
    height: 600,
    icon: `${__dirname}/assets/RO_Roadsign_1C.ico`,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
    // resizable: false
  })

  if(isDev) {
    win.webContents.openDevTools();
  }
  win.loadFile('index.html');
  // win.loadURL("https://www.linkedin.com/in/nihatbabazade/")
}

if(isDev) {
  console.log(isDev , "27")
}

app.whenReady().then(() => {
  createWindow();
  app.on('close', () => win = null);

  const mainMenu = Menu.buildFromTemplate(menu);
  // Menu.setApplicationMenu(mainMenu)


  app.on('window-all-closed', () => {
    if (!isWin32) app.quit()
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

const menu = [
  ...(isWin32 ? [{role: "appMenu"}] : []),
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        click: () => app.quit()
      }
    ]
  }
]

// if (isWin32) {
//   menu.unshift({ role: 'appMenu' })
// }

ipcMain.on( 'image:minimize', (e, options) => {
  console.log(options)
})

// If development environment
if (env === 'development') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
  });
}

console.log("yeah")
console.log(isDev)

