const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  // Renderer to main
  // Main to renderer ( Two-way)
  promptTouchID: (reason) => ipcRenderer.invoke("touch-id:prompt", reason),
  encrypt: (data) => ipcRenderer.invoke("touch-id:encrypt", data),
  decrypt: (blob) => ipcRenderer.invoke("touch-id:decrypt", blob),
  // Event Listeners (Main to Renderer)
});
