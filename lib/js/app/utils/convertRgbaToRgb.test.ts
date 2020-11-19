import { convertRgbaToRgb } from './convertRGBAtoRGB';

test('should convert RGBA to RGB', () => {
  const color = { red: 10, green: 20, blue: 30, alpha: 0.25 };
  const result = convertRgbaToRgb(color);
  expect(result).toEqual('#c2c4c7');
});

test('should convert transparent color to white', () => {
  const color = { red: 10, green: 20, blue: 30, alpha: 0 };
  const result = convertRgbaToRgb(color);
  expect(result).toEqual('#fff');
});

test('should convert solid color to the same color', () => {
  const color = { red: 0, green: 0, blue: 0, alpha: 1 };
  const result = convertRgbaToRgb(color);
  expect(result).toEqual('#000');
});
