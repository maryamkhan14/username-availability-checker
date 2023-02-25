require("dotenv").config();

const express = require("express");
const cors = require("cors");
const crawlTiktokRoutes = require("./routes/crawlTiktok");

const app = express();
app.use(cors());
app.options("*", cors());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Max-Age", "86400"); // 24 hours

  next();
});

app.use(express.json());

app.use("/crawl", crawlTiktokRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
});
