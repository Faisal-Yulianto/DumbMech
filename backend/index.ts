import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import authRouter from './src/router/authRoutes';
import profileRouter from './src/router/profileRoutes'
import productRouter from './src/router/productRoutes'
import categoryRouter from './src/router/categoryRoutes'
import corsOptions from "./src/utils/cors";
import cors from "cors"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/api/profile',profileRouter)
app.use('/api',productRouter)
app.use('/api',categoryRouter)

app.listen(port, () => {corsOptions
  console.log(`[server]: Server is running at http://localhost:${port}`);
});