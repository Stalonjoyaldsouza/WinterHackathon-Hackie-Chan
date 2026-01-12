import dgram from "dgram";

const PORT = 41234;

export function broadcastSession(data: any) {
  const socket = dgram.createSocket("udp4");

  socket.bind(() => {
    try {
      socket.setBroadcast(true);

      const message = Buffer.from(JSON.stringify(data));

      socket.send(message,0,message.length,PORT,"255.255.255.255",() => {
          socket.close();
        }
      );
    } catch (err) {
      console.error("UDP broadcast failed:", err);
      socket.close();
    }
  });
}

export function listenForStudents(onStudent: (s: any) => void) {
  const socket = dgram.createSocket("udp4");

  socket.on("message", (msg) => {
    try {
      const data = JSON.parse(msg.toString());
      if (data.type === "STUDENT_JOIN") {
        onStudent(data);
      }
    } catch {}
  });

  socket.bind(41234);
}

