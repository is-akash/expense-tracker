import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./database/db.js";
import transactionRoute from "./routes/transactionRoute.js";
import authRoutes from "./routes/authRoutes.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/v1/transactions", transactionRoute);
app.use("/v1/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("This is home route");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});
