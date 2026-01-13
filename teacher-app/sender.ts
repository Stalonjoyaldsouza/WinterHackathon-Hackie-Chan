import dgram from "dgram";

const PORT = 41234;
const BROADCAST_ADDR = "255.255.255.255";

const socket = dgram.createSocket("udp4");

const message = {
  from: "Laptop A",
  text: "Hello from UDP broadcast"
};

socket.bind(0, () => {
  socket.setBroadcast(true);

  const buffer = Buffer.from(JSON.stringify(message));

  socket.send(buffer, PORT, BROADCAST_ADDR, (err) => {
    if (err) {
      console.error("Send error:", err);
    } else {
      console.log("Message sent");
    }
    socket.close();
  });
});
