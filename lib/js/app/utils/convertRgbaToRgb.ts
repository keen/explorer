import { toColorString } from 'polished';
import { RgbaColor, RgbColor } from 'polished/lib/types/color';

export const convertRgbaToRgb = (
  color: RgbaColor,
  background: RgbColor = { red: 255, green: 255, blue: 255 }
) => {
  const { alpha } = color;

  const result = {
    red: Math.round((1 - alpha) * background.red + alpha * color.red),
    green: Math.round((1 - alpha) * background.green + alpha * color.green),
    blue: Math.round((1 - alpha) * background.blue + alpha * color.blue),
  };
  return toColorString(result);
};
