import {formDataToObject, objectToFromData} from '@/helpers/form-data';
import {expect, test} from 'vitest';

test('Test FormData conversion to Object', () => {
  const formData = new FormData();

  formData.append('2_$ACTION_REF_2', 'Should be removed');
  formData.append('$ACTION_REF', 'Should be removed');
  formData.append('2_$ACTION_2:2_title', 'Should be removed');
  formData.append('field', 'value');
  formData.append('empty', '');
  formData.append('emptyItemInArray[]', '');
  formData.append('array[]', 'MD');
  formData.append('array[]', 'RO');
  formData.append('array[]', 'US');
  formData.append('object[item1]', 'nested value 1');
  formData.append('object[item2]', 'nested value 2');
  formData.append('nestedNonIndexedArray[item][]', 'value 1');
  formData.append('nestedNonIndexedArray[item][]', 'value 2');
  formData.append('nestedIndexedArray[0][item1]', 'index 0 - item 1');
  formData.append('nestedIndexedArray[0][item2]', 'index 0 - item 2');
  formData.append('nestedIndexedArray[1][item1]', 'index 1 - item 1');
  formData.append('nestedIndexedArray[1][item2]', 'index 1 - item 2');
  formData.append('nestedIndexedArrayWithIndexOutOfRange[4294967295][item]', 'value');
  formData.append('nestedUuidObject[43780657-880a-49f8-930a-78c22453aefe][item]', 'value');

  const result = formDataToObject(formData);

  expect(result).toStrictEqual({
    field: 'value',
    empty: '',
    emptyItemInArray: [''],
    array: ['MD', 'RO', 'US'],
    object: {item1: 'nested value 1', item2: 'nested value 2'},
    nestedNonIndexedArray: {item: ['value 1', 'value 2']},
    nestedIndexedArray: [
      {item1: 'index 0 - item 1', item2: 'index 0 - item 2'},
      {item1: 'index 1 - item 1', item2: 'index 1 - item 2'},
    ],
    nestedUuidObject: {
      '43780657-880a-49f8-930a-78c22453aefe': {
        item: 'value',
      },
    },
    nestedIndexedArrayWithIndexOutOfRange: {
      '4294967295': {
        item: 'value',
      },
    },
  });
});

test('Expect exception while using empty brackets in the middle of the field name', async () => {
  const formData = new FormData();

  formData.append('object[][item]', 'value');

  expect(() => formDataToObject(formData)).toThrowError('Empty brackets (without index) are only allowed at the end of an input name to denote an array.');
});

test('Test Object conversion to FormData', () => {
  const source = {
    field: 'value',
    empty: '',
    emptyArray: [],
    emptyItemInArray: [''],
    array: ['MD', 'RO', 'US'],
    object: {item1: 'nested value 1', item2: 'nested value 2'},
    nestedNonIndexedArray: {item: ['value 1', 'value 2']},
    nestedIndexedArray: [
      {item1: 'index 0 - item 1', item2: 'index 0 - item 2'},
      {item1: 'index 1 - item 1', item2: 'index 1 - item 2'},
    ],
    nestedUuidObject: {
      '43780657-880a-49f8-930a-78c22453aefe': {
        item: 'value',
      },
    },
    nestedIndexedArrayWithIndexOutOfRange: {
      '4294967295': {
        item: 'value',
      },
    },
  };
  const formData = objectToFromData(source);

  expect(formData.get('field')).toBe('value');
  expect(formData.get('empty')).toBe('');
  expect(formData.get('emptyArray')).toBe(null);
  expect(formData.get('emptyArray[]')).toBe(null);
  expect(formData.get('emptyItemInArray[0]')).toBe('');
  expect(formData.get('array[0]')).toBe('MD');
  expect(formData.get('array[1]')).toBe('RO');
  expect(formData.get('array[2]')).toBe('US');
  expect(formData.get('object[item1]')).toBe('nested value 1');
  expect(formData.get('object[item2]')).toBe('nested value 2');
  expect(formData.get('nestedNonIndexedArray[item][0]')).toBe('value 1');
  expect(formData.get('nestedNonIndexedArray[item][1]')).toBe('value 2');
  expect(formData.get('nestedIndexedArray[0][item1]')).toBe('index 0 - item 1');
  expect(formData.get('nestedIndexedArray[0][item2]')).toBe('index 0 - item 2');
  expect(formData.get('nestedIndexedArray[1][item1]')).toBe('index 1 - item 1');
  expect(formData.get('nestedIndexedArray[1][item2]')).toBe('index 1 - item 2');
  expect(formData.get('nestedUuidObject[43780657-880a-49f8-930a-78c22453aefe][item]')).toBe('value');
  expect(formData.get('nestedIndexedArrayWithIndexOutOfRange[4294967295][item]')).toBe('value');
});
