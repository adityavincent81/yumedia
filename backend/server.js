require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./src/app");
const connectDB = require("./src/config/db");

const {
  initializeSockets,
} = require("./src/sockets");

const PORT =
  process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server =
      http.createServer(app);

    const io = new Server(
      server,
      {
        cors: {
          origin:
            process.env.CLIENT_URL,
          credentials: true,
        },
      }
    );

    /**
     * Initialize all socket modules
     */
    initializeSockets(io);

    /**
     * Make io available
     * inside controllers/services
     * through req.app.get("io")
     */
    app.set("io", io);

    io.on(
      "connection",
      (socket) => {
        console.log(
          `User Connected: ${socket.id}`
        );

        socket.on(
          "disconnect",
          () => {
            console.log(
              `User Disconnected: ${socket.id}`
            );
          }
        );
      }
    );

    server.listen(
      PORT,
      () => {
        console.log(
          `Server running on port ${PORT}`
        );
      }
    );
  } catch (error) {
    console.error(
      "Server startup failed:",
      error
    );

    process.exit(1);
  }
};

startServer();