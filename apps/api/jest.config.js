module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: '<rootDir>/../tsconfig.jest.json',
    }],
  },
  collectCoverageFrom: ['**/*.{ts,js}'],
  coverageReporters: ['html', 'text-summary', 'lcov'],
  testEnvironment: 'node',
};
