import { isElementInViewport } from './isElementInViewport';

const element = {
  current: {
    getBoundingClientRect: () => ({
      top: 100, bottom: 10, left: 10, right: 10
    })
    }
  }

test('should return "true" for element in viewport', () => {
  global.innerHeight = 1024;
  const test = isElementInViewport(element);
  expect(test).toBeTruthy();
});

test('should return "false" for element outside viewport', () => {
  global.innerHeight = 50;
  const test = isElementInViewport(element);
  expect(test).toBeFalsy();
});
