const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  // Renderer to main
  // Main to renderer ( Two-way)
  // Event Listeners (Main to Renderer)
});
