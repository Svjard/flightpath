import { isArray, isObject, isString, isNumber, isBoolean } from 'lodash';

export default {
  array(data) {
    return !data ? [] : isArray(data) ? data : [data];
  },
  object(data) {
    if (!data) {
      return {};
    }
    if (isArray(data) || isString(data) || isNumber(data) || isBoolean(data) || !isObject(data)) {
      return { data };
    } else {
      return data;
    }
  }
};
