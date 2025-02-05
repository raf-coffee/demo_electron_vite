import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import type { Partner } from "../../types";

const api = {
  getPartners: (): Promise<Partner[]> => ipcRenderer.invoke("getPartners"),
  createPartner: (partner: Partner): Promise<void> => ipcRenderer.invoke("createPartner", partner),
  updatePartner: (partner: Partner): Promise<void> => ipcRenderer.invoke("updatePartner", partner),
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
