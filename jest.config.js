// Jest 配置文件
module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000,
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: ['**/test/**/*.test.js'],
  moduleFileExtensions: ['js'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  globals: {
    __DEV__: true
  }
};
