import {SelectOption} from '@/components/dashboard/forms/custom-select';

export function findDefaultValueFromFormDataEntryValue(options: SelectOption[], defaultValue: FormDataEntryValue | null): SelectOption | undefined {
  return options.find((option) => {
    if (!Array.isArray(defaultValue)) {
      return defaultValue === option.value;
    }

    return defaultValue.includes(option.value);
  });
}
