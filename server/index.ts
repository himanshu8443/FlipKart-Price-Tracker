import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./utils/database";
import addProduct from "./controllers/AddProduct";
import SendAlerts from "./controllers/SendAlerts";

const app = express();

app.use(
  cors({
    origin: JSON.parse(process.env.CORS_ORIGIN!),
    credentials: true,
  })
);
dotenv.config();
app.use(express.json());
connect();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/add-product", addProduct);
app.get("/api/send-alerts", SendAlerts);

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
