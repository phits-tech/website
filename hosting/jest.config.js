module.exports = {
  preset: 'ts-jest',
  // transform: { '^.+\\.vue$': 'vue-jest' },
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['/dist/'],
  testPathIgnorePatterns: ['/node_modules/'],
  reporters: ['default'],
  coverageDirectory: '../coverage'
}
