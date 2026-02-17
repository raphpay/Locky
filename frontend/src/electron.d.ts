export interface IElectronAPI {
  // Renderer to Main (One-way: fire and forget)
  // Main to Renderer (Two-way: returns a Promise)
  promptTouchID: (reason: string) => Promise<boolean>;
  encrypt: (data: string) => Promise<string>;
  decrypt: (blob: string) => Promise<string>;
  // Event Listeners (Main to Renderer)
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
