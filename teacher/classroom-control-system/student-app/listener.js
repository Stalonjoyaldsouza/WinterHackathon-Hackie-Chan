const dgram = require("dgram");

const PORT = 41234;
const socket = dgram.createSocket("udp4");

// Fake student identity for now
const STUDENT = {
  name: "Test Student",
  usn: "USN001",
};

socket.on("listening", () => {
  const address = socket.address();
  console.log(`Student listening on ${address.address}:${address.port}`);
});

socket.on("message", (msg, rinfo) => {
  try {
    const data = JSON.parse(msg.toString());

    if (data.type === "SESSION_START") {
      console.log("Session received:", data);

      // Respond back to teacher
      const response = Buffer.from(
        JSON.stringify({
          type: "STUDENT_JOIN",
          usn: STUDENT.usn,
          name: STUDENT.name,
        })
      );

      socket.send(response, rinfo.port, rinfo.address);
    }
  } catch (err) {
    console.error("Invalid packet", err);
  }
});

socket.bind(PORT);
