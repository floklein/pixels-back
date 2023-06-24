import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as bodyParser from "body-parser";
import router from "./src/router";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

function defaultRoute(req: Request, res: Response) {
  res.sendStatus(404);
}

function errorHandler(err: Error, req: Request, res: Response) {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/", router);
app.use(defaultRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
