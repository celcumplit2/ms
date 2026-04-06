'use client';

import CustomSelect, {CustomSelectProps, SelectOption} from '@/components/dashboard/forms/custom-select';
import {countries} from 'countries-list';
import {GroupBase} from 'react-select';

interface CountrySelectProps<IsMulti extends boolean> extends Omit<CustomSelectProps<SelectOption, IsMulti, GroupBase<SelectOption>>, 'options' | 'defaultValue'> {
    defaultValue?: string | string[];
}

export default function CountrySelect<IsMulti extends boolean = false>({defaultValue, ...restProps}: CountrySelectProps<IsMulti>) {
    const countryOptions = Object.keys(countries).map((key) => ({
        value: key,
        label: countries[key as keyof typeof countries].name,
    }));

    return (
        <CustomSelect
            {...restProps}
            defaultValue={countryOptions.filter(
                (country) => Array.isArray(defaultValue)
                    ? defaultValue.includes(country.value)
                    : defaultValue === country.value,
            )}
            options={countryOptions}
        />
    );
}
