module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  testPathIgnorePatterns: [".*\\.page\\.ts$"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./test-reports",
        outputName: "junit.xml",
      },
    ],
  ],
};
