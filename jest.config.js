module.exports = {
  verbose: true,
  projects: [
    {
      runner: 'jest-runner-eslint',
      displayName: 'lint',
      testMatch: ['<rootDir>/src/**/*.js'],
    },
    {
      displayName: 'test',
      collectCoverageFrom: ['./src/**/*.js'],
      testPathIgnorePatterns: ['/node_modules/', '/dist/'],
      coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
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
