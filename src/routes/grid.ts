import { Router } from "express";
import { CreatePixelBody, DeletePixelBody, Grid } from "../types/grid";
import { hsv2rgb, rad2deg, xy2polar } from "../lib/color";

const router = Router();

const GRID_SIZE = 50;
const GRID_CENTER = (GRID_SIZE - 1) / 2;
const RADIUS = GRID_CENTER;

const USERS = ["florent", "swann", "theo", "nicolas", "daminou21"];

const createDefaultGrid = (): Grid => {
  const grid: Grid = {};
  for (let x = 0; x < GRID_SIZE; x += 1) {
    for (let y = 0; y < GRID_SIZE; y += 1) {
      const shouldHavePixel =
        Math.pow(x - GRID_CENTER, 2) + Math.pow(y - GRID_CENTER, 2) <
        Math.pow(GRID_CENTER, 2);
      if (!shouldHavePixel) {
        continue;
      }
      let [, phi] = xy2polar(x - GRID_CENTER, y - GRID_CENTER);
      let hue = rad2deg(phi);
      let saturation =
        Math.sqrt(Math.pow(x - GRID_CENTER, 2) + Math.pow(y - GRID_CENTER, 2)) /
        RADIUS;
      let value = 1.0;
      let [red, green, blue] = hsv2rgb(hue, saturation, value);
      grid[`${x}-${y}`] = {
        user: USERS[Math.floor(Math.random() * USERS.length)],
        // color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        color: `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(
          blue
        )})`,
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
  grid[body.coordinates] = body;
  res.sendStatus(200);
});

router.delete("/", (req, res) => {
  const body: DeletePixelBody = req.body;
  delete grid[body.coordinates];
  res.sendStatus(200);
});

export default router;
