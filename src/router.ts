import { Router } from "express";
import grid from "./routes/grid";

const router = Router();

router.use("/", grid);

export default router;
