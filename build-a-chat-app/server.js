import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;


const server = http.createServer((req, res) => {
  const files = {
    "/": { path: "./public/index.html", contentType: "text/html" },
    "/index.html": { path: "./public/index.html", contentType: "text/html" },
    "/script.js": {
      path: "./public/script.js",
      contentType: "text/javascript",
    },
  };
  const file = files[req.url];

  if (!file) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
    return;
  }

  fs.readFile(file.path, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error loading page");
      return;
    }
    res.writeHead(200, { "Content-Type": file.contentType });
    res.end(data);
  });
});

const wss = new WebSocketServer({ server });

wss.on("connection", (socket, req) => {
  const username = new URL(req.url, "http://localhost").searchParams.get(
    "username"
  );

  // Requirement 4: Broadcast user join message to all connected clients
  const joinMsg = JSON.stringify({
    type: "system",
    text: `${username} joined`
  });
  
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(joinMsg);
    }
  });

  // Requirement 5: Listen for chat messages and broadcast to all connected clients
  socket.on("message", (data) => {
    const { username: msgUsername, text } = JSON.parse(data);
    const chatMsg = JSON.stringify({
      type: "chat",
      username: msgUsername,
      text
    });

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(chatMsg);
      }
    });
  });

  // Requirement 6: Listen for close and broadcast user left message to remaining clients
  socket.on("close", () => {
    const leaveMsg = JSON.stringify({
      type: "system",
      text: `${username} left`
    });

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(leaveMsg);
      }
    });
  });
});
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});