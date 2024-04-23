const nextJest = require('next/jest')
const { defaults: tsjPreset } = require('ts-jest/presets')

const createJestConfig = nextJest({
  dir: '.',
})

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    ...tsjPreset.transform,
  },
}

module.exports = createJestConfig(config)
