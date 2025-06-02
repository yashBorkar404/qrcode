// import nextJest from "next/jest.js"

// const createJestConfig = nextJest({
//   dir: "./",
// })

// /** @type {import('jest').Config} */
// const config = {
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//   testEnvironment: "jest-environment-jsdom",
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/$1",
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//     "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "jest-transform-stub",
//   },
//   testPathIgnorePatterns: ["/node_modules/", "/.next/", "/coverage/"],
//   collectCoverageFrom: [
//     "app/**/*.{js,jsx,ts,tsx}",
//     "components/**/*.{js,jsx,ts,tsx}",
//     "actions/**/*.{js,jsx,ts,tsx}",
//     "lib/**/*.{js,jsx,ts,tsx}",
//     "!**/*.d.ts",
//     "!**/node_modules/**",
//     "!app/layout.tsx",
//     "!app/globals.css",
//     "!**/*.config.{js,ts}",
//     "!app/api/**",
//     "!middleware.ts",
//   ],
//   moduleDirectories: ["node_modules", "<rootDir>/"],
//   testMatch: [
//     "<rootDir>/tests/**/*.{js,jsx,ts,tsx}",
//     "<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}",
//     "<rootDir>/**/*.(test|spec).{js,jsx,ts,tsx}",
//   ],
//   coverageDirectory: "coverage",
//   coverageReporters: ["text", "lcov", "html", "json"],
//   coverageThreshold: {
//     global: {
//       branches: 70,
//       functions: 70,
//       lines: 70,
//       statements: 70,
//     },
//   },
//   transformIgnorePatterns: ["/node_modules/(?!(react-d3-tree|d3|react-syntax-highlighter)/)"],
//   testTimeout: 10000,
// }

// export default createJestConfig(config)
import nextJest from "next/jest.js"

const createJestConfig = nextJest({
  dir: "./",
})

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "jest-transform-stub",
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/coverage/"],
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "components/**/*.{js,jsx,ts,tsx}",
    "actions/**/*.{js,jsx,ts,tsx}",
    "lib/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!app/layout.tsx",
    "!app/globals.css",
    "!**/*.config.{js,ts}",
    "!app/api/**",
    "!middleware.ts",
  ],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testMatch: [
    "<rootDir>/tests/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/**/*.(test|spec).{js,jsx,ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html", "json"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  transformIgnorePatterns: ["/node_modules/(?!(react-d3-tree|d3|react-syntax-highlighter)/)"],
  testTimeout: 10000,
}

export default createJestConfig(config)
