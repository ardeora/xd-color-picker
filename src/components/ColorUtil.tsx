export interface RGBColor {
    red: number,
    green: number,
    blue: number
}

export interface HSBColor {
  hue: number,
  saturation: number,
  brightness: number
}

export function HSBtoRGB(hue: number, saturation: number = 100, brightness: number = 100): RGBColor {
    let c = saturation/100 * brightness/100
    let x = c * (1 - Math.abs((hue / 60) % 2 - 1))
    let m = brightness/100 - c
    let r = 0
    let g = 0
    let b = 0;

    if (0 <= hue && hue < 60) {
      r = c; g = x; b = 0;  
    } else if (60 <= hue && hue < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= hue && hue < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= hue && hue < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= hue && hue < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= hue && hue < 360) {
      r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return {red: r, green: g, blue: b}
}
