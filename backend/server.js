require("dotenv").config();

const express = require("express");
const cors = require("cors");
const searchProfileRoutes = require("./routes/searchProfiles");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/search", searchProfileRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
