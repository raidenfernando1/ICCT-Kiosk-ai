import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const mainWindow = new BrowserWindow({
    fullscreen: true, // Makes the window fullscreen by default
    autoHideMenuBar: true, // Hides the menu bar automatically
    width: 800, // Set the width of the window
    height: 600, // Set the height of the window
    webPreferences: {
      contextIsolation: true, // Isolates the context for security
      nodeIntegration: false, // Disables Node.js integration for security
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL || "http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist-web/index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
