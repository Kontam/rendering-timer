/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ["jest-date-mock"],
  testMatch: [ "**/__tests__/**/*.test.[jt]s?(x)" ]
};
