export interface Pixel {
  user: string;
  color: string;
}

export type Coordinates = `${number}-${number}`;

export type Grid = Record<Coordinates, Pixel>;

export interface GetPixelParams {
  coordinates: Coordinates;
}

export interface CreatePixelBody extends Pixel {
  coordinates: Coordinates;
}

export interface DeletePixelBody {
  coordinates: Coordinates;
}
