import express from "express";
import dotenv from "dotenv";
 
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/user.routes";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const port = process.env.PORT;
 

// common middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// routes
app.use("/api/v1/user", userRoutes);


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
