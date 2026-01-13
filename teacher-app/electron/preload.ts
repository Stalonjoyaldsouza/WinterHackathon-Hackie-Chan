import { contextBridge } from "electron";
import { broadcastSession,listenForStudents,sendKick,broadcastEndSession, } from "./udp";

contextBridge.exposeInMainWorld("lan", {
  broadcastSession: (data: any) => broadcastSession(data),
  listenForStudents: (callback: any) => listenForStudents(callback),
  sendKick: (usn: string, address: string, port: number) =>sendKick(usn, address, port),
  endSession: () => broadcastEndSession(),


});

