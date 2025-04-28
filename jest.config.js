// module.exports = {
//   testEnvironment: 'jsdom', 
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   moduleNameMapper: {
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//   },
//   transform: {
//     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
//   },
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
// };

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
}

module.exports = createJestConfig(customJestConfig)