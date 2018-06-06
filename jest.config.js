module.exports = {
  verbose: true,
  bail: true,
  browser: true,
  testMatch: [`<rootDir>/test/unit/**/ProjectActionsSpec.js`],
  testEnvironment: process.env.TEST_ENV || 'jsdom-c3',
  setupFiles: ["./test/setup-jest.js"],
  testURL: "https://localhostjsdomtesting.com/"
};
