import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import * as bodyParser from "body-parser";
import router from "./src/router";
import cors from "cors";
import { IsPixelsError } from "./src/errors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/", router);

app.use((req: Request, res: Response) => {
  res.sendStatus(404);
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(IsPixelsError(err) ? err.statusCode : 500)
    .json({ name: err.name, message: err.message });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
