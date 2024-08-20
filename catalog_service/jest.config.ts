/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: true,
  verbose:true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleDirectories:['node_modules',"src"],
  coveragePathIgnorePatterns:['/node_modules'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)']

};

export default config;
