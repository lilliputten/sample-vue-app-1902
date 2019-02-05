module.exports = {
  testURL : 'http://localhost',
  testPathIgnorePatterns : [ 'node_modules' ],
  moduleFileExtensions : [ 'vue', 'js' ],
  // globals: {
  //   __TS_CONFIG__: "tsconfig.test.json"
  // },
  transform : {
    // '^.+\\.(ts|tsx)$' : 'ts-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch : [
      '**/src/**/*.test.+(js|vue)',
  ],
  moduleNameMapper: {
    // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|svg)$': '<rootDir>/__mocks__/style.js'
  },
  // testEnvironment: '<rootDir>/__mocks__/customizedJsdomEnv.js',
  setupFiles: [ '<rootDir>/__mocks__/setup.js' ],
  modulePaths : [
    '<rootDir>/src',
  ],
};
