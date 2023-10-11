import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./utils/database";
import addProduct from "./controllers/AddProduct";
import SendAlerts from "./controllers/SendAlerts";
import SearchProduct from "./controllers/SearchProduct";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
dotenv.config();
app.use(express.json());
connect();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes
app.post("/api/add-product-tracking", addProduct);
app.get("/api/send-alerts", SendAlerts);
app.post("/api/search-product", SearchProduct);

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
