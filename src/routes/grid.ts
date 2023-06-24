import { Router } from "express";
import {
  Coordinates,
  Grid,
  CreatePixelBody,
  DeletePixelBody,
} from "../types/grid";

const router = Router();

const grid: Grid = {};

router.get("/", (req, res) => {
  res.send(grid);
});

router.post("/", (req, res) => {
  const body: CreatePixelBody = req.body;
  grid[body.coordinates] = {
    user: body.user,
    color: body.color,
  };
  res.sendStatus(200);
});

router.delete("/", (req, res) => {
  const body: DeletePixelBody = req.body;
  delete grid[body.coordinates];
  res.sendStatus(200);
});

export default router;
