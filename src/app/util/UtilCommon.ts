import * as lodash from 'lodash';

export class UtilCommon {
  /** ディープコピー */
  static deepCopy<T>(object: T): T {
    const newSameObject = lodash.cloneDeep(object);
    return newSameObject;
  }

  /** null判定 */
  static isNull<T>(object: T): boolean {
    if (object === null) {
      return true;
    }

    if (object === undefined) {
      return true;
    }

    if (object === 'undefined') {
      return true;
    }

    return false;
  }

  /** 空判定 */
  static isEmpty(value: string): boolean {
    if (this.isNull(value) || value.length === 0) {
      return true;
    }

    return false;
  }

  /** 一致判定 */
  static isEqual(valueA: any, valueB: any): boolean {
    if (valueA === valueB) {
      return true;
    }

    return false;
  }
}
