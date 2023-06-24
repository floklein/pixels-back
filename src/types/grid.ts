export interface Pixel {
  user: string;
  color: string;
}

export type Coordinates = `${number}-${number}`;

export type Grid = Record<Coordinates, Pixel>;

export interface NewPixel extends Pixel {
  coordinates: Coordinates;
}
