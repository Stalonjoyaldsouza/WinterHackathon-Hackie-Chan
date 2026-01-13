import { contextBridge } from "electron";
import { broadcastSession,listenForStudents } from "./udp";

contextBridge.exposeInMainWorld("lan", {
  broadcastSession: (data: any) => broadcastSession(data),
  listenForStudents: (callback: any) => listenForStudents(callback),
});

