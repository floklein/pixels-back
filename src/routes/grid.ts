import { Router } from "express";
import { Grid, NewPixel } from "../types/grid";

const router = Router();

const grid: Grid = {};

router.get("/", (req, res) => {
  res.send(grid);
});

router.post("/", (req, res) => {
  console.log(req.body);
  const body: NewPixel = req.body;
  grid[body.coordinates] = {
    user: body.user,
    color: body.color,
  };
  res.sendStatus(200);
});

export default router;
