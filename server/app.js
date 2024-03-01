import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import ProductRoutes from "./routes/ProductRoute.js";
import connect from "./config/connect.js";

const app = express();
const port = 3001 || 5000;

//Connection to DB
connect()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

// Server-middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// App-Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", UserRoutes);
app.use("/api/product", ProductRoutes);

// Port-listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
