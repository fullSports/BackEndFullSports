require("dotenv").config();
const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000",
    options: {
      "sonar.token": String(process.env.S_TOKEN_ACESS),
      "sonar.sources": "src",
      "sonar.inclusions": "src/**/*.ts",
      "sonar.projectKey": String(process.env.S_NAME_PROJECT),
      // unit tests
      "sonar.tests": "src",
      "sonar.test.inclusions": "src/**/*.spec.ts",
      "sonar.coverage.jest.reportPaths": "coverage/lcov-report/*.lcov",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",

      // e2e tests
      "sonar.tests.e2e": "test",
      "sonar.test.e2e.inclusions": "test/**/*.e2e-spec.ts",
      "sonar.coverage.jest.e2e.reportPaths": "test/coverage/lcov-report/*.lcov",
      "sonar.javascript.lcov.e2e.reportPaths": "test/coverage/lcov.info",

      "sonar.coverage.exclusions":
        " \
      **/node_modules/**,\
      **/dist/**,\
      **/*model.ts,\
      **/*schema.ts,\
      **/*config.ts,\
      **/*module.ts,\
      **/*main.ts,\
      **/*dto.ts,\
      **/*enum.ts,\
      **/*strategy.ts,\
      **/guards/**,\
      **/mock/**,\
      **/mocks/**,\
      **/dto/**,\
      **/config/**,\
      **/interfaces/**,\
      **/*.js,\
      **/coverage/**",
    },
  },
  () => {}
);
