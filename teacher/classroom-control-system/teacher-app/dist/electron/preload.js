"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const udp_1 = require("./udp");
electron_1.contextBridge.exposeInMainWorld("lan", {
    broadcastSession: (data) => (0, udp_1.broadcastSession)(data),
    listenForStudents: (callback) => (0, udp_1.listenForStudents)(callback),
});
