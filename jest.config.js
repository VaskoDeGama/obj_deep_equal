module.exports = {
  projects: [
    {
      runner: 'jest-runner-eslint',
      displayName: 'lint',
      testMatch: ['<rootDir>/src/**/*.js'],
    },
    {
      displayName: 'test',
      collectCoverageFrom: ['./src/**/*.js'],
      coveragePathIgnorePatterns: ['/node_modules/'],
      coverageThreshold: {
        global: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
      },
    },
  ],
}
