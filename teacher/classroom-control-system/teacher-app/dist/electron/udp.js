"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastSession = broadcastSession;
exports.listenForStudents = listenForStudents;
const dgram_1 = __importDefault(require("dgram"));
const PORT = 41234;
function broadcastSession(data) {
    const socket = dgram_1.default.createSocket("udp4");
    socket.bind(() => {
        try {
            socket.setBroadcast(true);
            const message = Buffer.from(JSON.stringify(data));
            socket.send(message, 0, message.length, PORT, "255.255.255.255", () => {
                socket.close();
            });
        }
        catch (err) {
            console.error("UDP broadcast failed:", err);
            socket.close();
        }
    });
}
function listenForStudents(onStudent) {
    const socket = dgram_1.default.createSocket("udp4");
    socket.on("message", (msg) => {
        try {
            const data = JSON.parse(msg.toString());
            if (data.type === "STUDENT_JOIN") {
                onStudent(data);
            }
        }
        catch { }
    });
    socket.bind(41234);
}
