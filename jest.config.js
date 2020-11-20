module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },

  transform: {
    "^.+\\.[t|j]sx?$": "ts-jest"
  },

  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },

  testEnvironment: 'jest-environment-jsdom-sixteen',

  setupFilesAfterEnv: [
  '<rootDir>/jest.setup.ts'
  ],

  transformIgnorePatterns: [
     "<rootDir>/node_modules/(?!(@keen.io)/)"
   ],

  testTimeout: 10000,

  clearMocks: true,

  coverageDirectory: "coverage",

  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node"
  ],

};
