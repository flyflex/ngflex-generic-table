/**
 * Set of helpers for NgFlex libs
 * @todo move to separate library
 */
export class NgFlexHelpers {
 /**
  * Access object nested value by giving a path
  *
  * @param obj The object you want to access value from
  * @param path The value path. e.g: `bar.baz`
  * @example
  *   const obj = { foo: { bar: 'Baz' } };
  *   const path = 'foo.bar';
  *   leaf(obj, path) // 'Baz'
  */
  public static leaf(obj: Record<string, any>, path: string, keepBoolean = false): string {
    const result = path.split('.').reduce((value, el) => {
      if (value && el && typeof value[el] === 'boolean' && keepBoolean) {
        return value[el];
      }

      return value[el] || {};
    }, obj);

    return NgFlexHelpers.isEmptyObject(result) ? null : result;
  };

 /**
  * checks whether an object is empty or not
  *
  * @param object object to extract values from
  * @returns boolean
  */
  public static isEmptyObject(obj): boolean {
    if (typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]') {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          return false;
        }
      }

      return true;
    }

    return false;
  }
}
