const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is running on port 4000");
});

// start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});