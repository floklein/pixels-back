export function xy2polar(x: number, y: number): [number, number] {
  let r = Math.sqrt(x * x + y * y);
  let phi = Math.atan2(y, x);
  return [r, phi];
}

export function rad2deg(rad: number): number {
  return ((rad + Math.PI) / (2 * Math.PI)) * 360;
}

export function hsv2rgb(
  hue: number,
  saturation: number,
  value: number
): [number, number, number] {
  let chroma = value * saturation;
  let hue1 = hue / 60;
  let x = chroma * (1 - Math.abs((hue1 % 2) - 1));
  let r1 = 0,
    g1 = 0,
    b1 = 0;
  if (hue1 >= 0 && hue1 <= 1) {
    [r1, g1, b1] = [chroma, x, 0];
  } else if (hue1 >= 1 && hue1 <= 2) {
    [r1, g1, b1] = [x, chroma, 0];
  } else if (hue1 >= 2 && hue1 <= 3) {
    [r1, g1, b1] = [0, chroma, x];
  } else if (hue1 >= 3 && hue1 <= 4) {
    [r1, g1, b1] = [0, x, chroma];
  } else if (hue1 >= 4 && hue1 <= 5) {
    [r1, g1, b1] = [x, 0, chroma];
  } else if (hue1 >= 5 && hue1 <= 6) {
    [r1, g1, b1] = [chroma, 0, x];
  }
  let m = value - chroma;
  let [r, g, b] = [r1 + m, g1 + m, b1 + m];
  return [255 * r, 255 * g, 255 * b];
}
