export function createFormDataFromObject(values: Record<string, string | number | boolean | Blob | (string | number | boolean | Blob)[]>): FormData {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    if (Array.isArray(values[key])) {
      values[key].forEach((value) => {
        formData.append(key, value instanceof Blob ? value : String(value));
      });
    } else {
      formData.append(key, values[key] instanceof Blob ? values[key] : String(values[key]));
    }
  });

  return formData;
}
