const {
  app,
  BrowserWindow,
  systemPreferences,
  ipcMain,
  safeStorage,
} = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const isDev = !app.isPackaged;
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../frontend/dist/index.html"));
  }
}

app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.handle("touch-id:prompt", async (event, reason) => {
  if (process.platform !== "darwin") return false;
  if (!systemPreferences.canPromptTouchID()) return false;

  try {
    await systemPreferences.promptTouchID(reason);
    return true;
  } catch (e) {
    console.error("Touch ID Cancelled or Failed");
    return false;
  }
});

// Encrypt biometrics data ( only after first scan )
ipcMain.handle("touch-id:encrypt", async (event, data) => {
  try {
    // safeStorage chiffre la donnée spécifiquement pour cet utilisateur/machine
    const encryptedBuffer = safeStorage.encryptString(data);
    console.log("enc 2", encryptedBuffer);
    return encryptedBuffer.toString("base64");
  } catch (e) {
    console.error("Encryption error:", e);
    throw e;
  }
});

// Decrypt method
ipcMain.handle("touch-id:decrypt", async (event, encryptedBase64) => {
  try {
    const buffer = Buffer.from(encryptedBase64, "base64");
    return safeStorage.decryptString(buffer);
  } catch (e) {
    console.error("Decryption error:", e);
    throw e;
  }
});
