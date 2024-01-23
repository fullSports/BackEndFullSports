import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "../tsconfig.json";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "./coverage",
  coverageReporters: ["lcov", "text-summary"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    ".*model\\.ts$",
    ".*schema\\.ts$",
    ".*config\\.ts$",
    ".*module\\.ts$",
    ".*main\\.ts$",
    ".*dto\\.ts$",
    ".*enum\\.ts$",
    ".*strategy\\.ts$",
    "/guards/",
    "/mock/",
    "/mocks/",
    "/dto/",
    "/config/",
    "/interfaces/",
    ".eslintrc.js",
    "commitlint.config.js",
    "/coverage/",
  ],
  preset: "@shelf/jest-mongodb",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/../",
  }),
};
export default config;

//  preset: "@shelf/jest-mongodb",
