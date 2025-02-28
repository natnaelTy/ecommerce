import express from "express";
import  router  from "./router/auth-router.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { json } from "express";
import cors from "cors";


dotenv.config();

const app = express();

app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json());
app.use(cookieParser());

const PORT = 5000 || 3000

app.use('/api/auth', router);

app.listen(PORT, () => {
    console.log(`Server is is running on ${PORT}`);
})