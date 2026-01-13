import dgram from "dgram";

const PORT = 41234;
let listenerSocket: dgram.Socket | null = null;

/* ----------------------------------
   BROADCAST SESSION OFFER (Teacher → LAN)
----------------------------------- */
export function broadcastSession(data: any) {
  const socket = dgram.createSocket({ type: "udp4", reuseAddr: true });

  socket.once("error", (err) => {
    console.error("Broadcast UDP error:", err);
    socket.close();
  });

  socket.bind(0, () => {
    socket.setBroadcast(true);

    // 🔄 CHANGED: Send SESSION_OFFER instead of SESSION_START
    const payload = {
      ...data,
      type: "SESSION_OFFER",  // Changed from SESSION_START
      teacherName: data.teacherName || "Teacher",
      section: data.section || "Unknown",
    };

    const message = Buffer.from(JSON.stringify(payload));

    socket.send(
      message,
      0,
      message.length,
      PORT,
      "255.255.255.255",
      () => {
        console.log("Broadcast sent:", payload);
        socket.close();
      }
    );
  });
}

/* ----------------------------------
   LISTEN FOR STUDENTS (Teacher)
----------------------------------- */
export function listenForStudents(onStudent: (s: any) => void) {
  if (listenerSocket) {
    console.warn("Listener already running");
    return;
  }

  const socket = dgram.createSocket({ type: "udp4", reuseAddr: true });

  socket.on("error", (err) => {
    console.error("Listener UDP error:", err);
    socket.close();
    listenerSocket = null;
  });

  socket.on("message", (msg, rinfo) => {
    try {
      const data = JSON.parse(msg.toString());

      // 🆕 Handle both JOIN and DECLINE
      if (data.type === "STUDENT_JOIN") {
        console.log("Student joined:", data);
        onStudent({
          ...data,
          status: "joined",
          address: rinfo.address,
          port: rinfo.port,
        });
        
        // 🆕 Send SESSION_START confirmation back to student
        confirmSessionStart(data, rinfo.address, rinfo.port);
      }

      if (data.type === "STUDENT_DECLINE") {
        console.log("Student declined:", data);
        onStudent({
          ...data,
          status: "declined",
          address: rinfo.address,
          port: rinfo.port,
        });
      }
    } catch (err) {
      console.error("Invalid UDP message:", err);
    }
  });

  socket.bind(PORT, () => {
    console.log(`Listening for students on port ${PORT}`);
  });

  listenerSocket = socket;
}

// 🆕 Confirm session start to specific student
function confirmSessionStart(studentData: any, address: string, port: number) {
  const socket = dgram.createSocket("udp4");

  const msg = Buffer.from(
    JSON.stringify({
      type: "SESSION_START",
      sessionId: studentData.sessionId,
      timestamp: Date.now(),
    })
  );

  socket.send(msg, port, address, () => {
    console.log("SESSION_START confirmation sent to", studentData.usn);
    socket.close();
  });
}

/* ----------------------------------
   SEND KICK (Teacher → Student)
----------------------------------- */
export function sendKick(usn: string, address: string, port: number) {
  const socket = dgram.createSocket("udp4");

  const msg = Buffer.from(
    JSON.stringify({
      type: "KICK",
      usn,
    })
  );

  socket.send(msg, port, address, () => socket.close());
}

/* ----------------------------------
   BROADCAST SESSION END
----------------------------------- */
export function broadcastEndSession() {
  const socket = dgram.createSocket({ type: "udp4", reuseAddr: true });

  socket.bind(0, () => {
    socket.setBroadcast(true);

    const message = Buffer.from(
      JSON.stringify({ type: "SESSION_END" })
    );

    socket.send(
      message,
      0,
      message.length,
      PORT,
      "255.255.255.255",
      () => socket.close()
    );
  });
}