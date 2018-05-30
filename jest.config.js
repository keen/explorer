module.exports = {
  verbose: true,
  bail: true,
  testMatch: [`<rootDir>/test/unit/**/app_spec.js`],
  testEnvironment: process.env.TEST_ENV || 'jsdom',
  setupFiles: ["./test/setup-jest.js"]
};
