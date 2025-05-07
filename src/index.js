import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/dbconnected.js";
import adminRoutes from "./routes/adminroutes.js";
import cookieParser from "cookie-parser";
import partnerRoutes from "./routes/pertner-routes.js";
import partneritemRoutes from "./routes/partneritemDatRoutes.js";

dotenv.config();

const app = express();
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.43.86:5173",
  "http://192.168.84.234:5173",
];

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/partner", partnerRoutes);
app.use("/api/v1/partneritemdetails", partneritemRoutes);

// Connect DB and Start Server
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();
