import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipeMock implements PipeTransform {
  public transform(value: string, params?: any): string {
    const limit: number = params[0];
    const suffix: string = !!params[1] ? ',' + params[1] : null;
    const detail = !!limit ? `(${limit}${suffix})` : null;

    const result = !!detail ? `truncated${detail} ${value}` : `truncated ${value}`;

    return result;
  }
}
