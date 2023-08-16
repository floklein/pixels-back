import { Request, Router } from "express";
import { CreatePixelBody, DeletePixelBody, GetPixelParams, Grid } from "../types/grid";
import { PixelsError } from "../errors";
import { getDefaultGrid } from "../lib/defaultGrid";

const router = Router();

const grid: Grid = getDefaultGrid();

router.get("/:coordinates", (req: Request<GetPixelParams>, res) => {
  const { coordinates } = req.params;
  if (!coordinates?.length) {
    throw new PixelsError("Missing params.coordinates", 400);
  }
  res.send(grid[coordinates]);
});

router.get("/", (req, res) => {
  res.send(grid);
});

router.post("/", (req, res, next) => {
  const body: CreatePixelBody = req.body;
  if (!body.coordinates) {
    throw new PixelsError("Missing body.coordinates", 400);
  }
  if (!body.user) {
    throw new PixelsError("Missing body.user", 400);
  }
  if (!body.color) {
    throw new PixelsError("Missing body.color", 400);
  }
  grid[body.coordinates] = body;
  res.sendStatus(200);
});

router.delete("/", (req, res) => {
  const body: DeletePixelBody = req.body;
  delete grid[body.coordinates];
  res.sendStatus(200);
});

export default router;
