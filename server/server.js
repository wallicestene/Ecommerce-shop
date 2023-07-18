const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const socketIO = require("socket.io");

const productsRoutes = require("./routes/productsRoutes");
const categoryRoutes = require("./routes/categoriesRoutes");
const cartRoutes = require("./routes/cartRoute");

const { changeStream } = require("./models/cartModel"); // Import the change stream from the cartModel file

require("dotenv").config();

// init app
const app = express();

// socket
const http = require("http");
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*"
    }
});

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// connecting to mongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
      console.log("Connected to the database");
    });
  })
  .catch((err) => console.log(err.message));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use(productsRoutes);
app.use(categoryRoutes);
app.use(cartRoutes);

// Emit data changes to connected clients
changeStream.on("dataChange", (change) => {
  io.emit("dataChange", change);
  console.log(change);
});


// Set up WebSocket connection
io.on("connection", (socket) => {
  console.log("A client has connected");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A client has disconnected");
  });
});

// fallback route for handling unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
