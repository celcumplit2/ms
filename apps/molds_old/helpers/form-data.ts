import {get, has, setWith} from 'lodash';

function splitFormDataKeyIntoArray(key: string): string[] {
  const regex = /([^\[\]]+)|(\[])/g;
  const matches = key.match(regex);

  return matches || [];
}

function composedCustomizer(paths: string[]) {
  return (nsValue: unknown, key: string): unknown => {
    if (nsValue === undefined) {
      const currentIndex = paths.indexOf(key);
      const nextKey = paths[currentIndex + 1];

      if (nextKey && !Number.isNaN(nextKey) && String(Number(nextKey)) === nextKey && Number(nextKey) >= 0 && Number(nextKey) < 4294967295) {
        return [];
      }

      return {};
    }
  };
}

export function formDataToObject(formData: FormData): Record<string, unknown> {
  const result = {};

  formData.forEach((value, key) => {
    // Skip NextJS special attributes.
    if (key.includes('$ACTION')) {
      return;
    }

    const paths = splitFormDataKeyIntoArray(key);
    const indexOfBrackets = paths.indexOf('[]');

    if (indexOfBrackets !== -1 && indexOfBrackets < paths.length - 1) {
      throw Error('Empty brackets (without index) are only allowed at the end of an input name to denote an array.');
    }

    if (!paths.includes('[]')) {
      setWith(result, paths, value, composedCustomizer(paths));
    } else if (paths[paths.length - 1] === '[]') {
      const currentPath = paths.slice(0, -1);
      const currentValue: string[] = has(result, currentPath) ? get(result, currentPath) : [];

      currentValue.push(value.toString());

      setWith(result, currentPath, currentValue, composedCustomizer(paths));
    }
  });

  return result;
}

function transformObjectValue(value: unknown, formData: FormData, key: string): void {
  if (typeof value === 'object') {
    if (value === null) {
      formData.append(key, String(value));
    } else if (value instanceof Blob || value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        transformObjectValue(item, formData, `${key}[${index}]`);
      });
    } else {
      recursiveTransformObjectToFormData(value as Record<string, unknown>, formData, key);
    }
  } else if (value === undefined) {
    // Skip the key;
  } else {
    formData.append(key, String(value));
  }
}

function recursiveTransformObjectToFormData(values: Record<string, unknown>, formData: FormData, parentKey: string = ''): FormData {
  for (const key in values) {
    const value = values[key];
    const fullKey = parentKey.length > 0 ? `${parentKey}[${key}]` : key;

    transformObjectValue(value, formData, fullKey);
  }

  return formData;
}

export function objectToFromData(values: Record<string, unknown>): FormData {
  const formData = new FormData();

  recursiveTransformObjectToFormData(values, formData, '');

  return formData;
}

export function objectErrorsToFormDataErrors(errors: Record<string, string>): Record<string, string> {
  return Object.keys(errors).reduce((result, key) => {
    const path = key
      .split('.')
      .map((item, index) => index === 0 ? item : `[${item}]`)
      .join('');

    result[path] = errors[key];

    return result;
  }, {} as Record<string, string>);
}
