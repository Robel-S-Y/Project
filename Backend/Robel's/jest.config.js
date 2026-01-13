export default {
    testEnvironment:'node',
    testTransform:{},
    globals:{
        'ts-jest':{
            useESM: true,
        },
    },
    moduleNameMapper:{
        '^(\\.{1,2}/.*)\\.js$':'$1',
    },
    testMatch:['**/__tests__/**/*.js','**/?(*.)+(spec|test).js'],
    collectCoverage: false,
    setupFilesAfterEnv:['<rootDir>/tests/setup.js'],
    testTimeout:10000,
}