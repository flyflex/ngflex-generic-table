module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: {
        before: [
          'jest-preset-angular/build/InlineFilesTransformer',
          'jest-preset-angular/build/StripStylesTransformer',
        ],
      },
      diagnostics: false
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  testEnvironment: 'jest-environment-jsdom-thirteen',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|js)?(x)',
    '**/+(*.)+(spec).+(ts|js)?(x)'
  ],
  moduleFileExtensions: [
    'ts',
    'js',
    'html'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|@ngx-translate)'
  ],
  coverageReporters: ['html', 'text-summary', 'text'],
  collectCoverageFrom: [
    'projects/ngflex/generic-table/src/lib/**/*.ts',

    // Exclusions
    '!tests/**/*.ts',
    '!projects/ngflex/generic-table/src/lib/**/*.module.ts',
    '!projects/ngflex/generic-table/src/lib/**/*.routes.ts',
    '!projects/ngflex/generic-table/src/lib/**/*.model.ts',
    '!projects/ngflex/generic-table/src/lib/**/models/*.ts',
    '!projects/ngflex/generic-table/src/lib/**/models/**/*.ts',
    '!projects/ngflex/generic-table/src/lib/**/model/*.ts',
    '!projects/ngflex/generic-table/src/lib/**/model/**/*.ts',
    '!projects/ngflex/generic-table/src/lib/**/animations/*.ts',
    '!projects/ngflex/generic-table/src/lib/**/*.animation.ts',
    '!projects/ngflex/generic-table/src/lib/**/vendors.ts',
    '!projects/ngflex/generic-table/src/lib/**/index.ts',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/coverage/',
    '<rootDir>/nginx/',
    '<rootDir>/.idea/',
    '<rootDir>/scripts/',
    '<rootDir>/cypress/',
  ],
  testURL: 'http://localhost',
  cacheDirectory: './jest-cache',
};
