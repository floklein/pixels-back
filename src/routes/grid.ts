import { Router } from "express";
import {
  Coordinates,
  Grid,
  CreatePixelBody,
  DeletePixelBody,
} from "../types/grid";

const router = Router();

const GRID_SIZE = 50;

const createDefaultGrid = (): Grid => {
  const grid: Grid = {};
  for (let x = 0; x < 50; x += 1) {
    for (let y = 0; y < 50; y += 1) {
      grid[`${x}-${y}`] = {
        user: Math.random().toString(36).substring(7),
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      };
    }
  }
  return grid;
};

const grid: Grid = createDefaultGrid();

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
