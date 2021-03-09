import 'reflect-metadata';
import 'jest-preset-angular/setup-jest';

import { defineGlobalsInjections } from '@ngneat/spectator';
import {
  TranslatePipeMock,
  TruncatePipeMock,
} from './tests/mocks';

Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});
/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});



defineGlobalsInjections({
  declarations: [
    TranslatePipeMock,
    TruncatePipeMock,
  ],
});
