const express = require("express");
const cors = require("cors");
const sequelize = require("./models");
const translateRouter = require("./routes/translate");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", translateRouter);

// Connect to database
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Unable to connect:", err));

app.listen(4000, () => console.log("Server running on port 4000"));
