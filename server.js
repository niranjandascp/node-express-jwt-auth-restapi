import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "30mb", extented: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use(cors());

await connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `💻 Server is running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  );
});
