// Simple Socket.IO server for chatapp with message history
const { Server } = require("socket.io");
const http = require("http");

const PORT = 4000;
const messageHistory = [
  { text: "Welcome to the chat!", sender: "system" },
];

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Socket.IO server running");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  // Send message history to new client
  socket.emit("history", messageHistory);

  socket.on("chat message", (msg) => {
    const messageObj = { text: msg, sender: "user" };
    messageHistory.push(messageObj);
    io.emit("chat message", msg);
  });
});

server.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});
