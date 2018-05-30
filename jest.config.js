module.exports = {
  verbose: true,
  bail: true,
  testMatch: [`<rootDir>/test/unit/modules/**.js`],
  testEnvironment: process.env.TEST_ENV || 'jsdom'
};
