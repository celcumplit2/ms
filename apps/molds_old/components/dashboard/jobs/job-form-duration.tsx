'use client';

import CustomSelect, {SelectOption} from '@/components/dashboard/forms/custom-select';
import Input from '@/components/dashboard/forms/input';
import {JobDurationType} from '@/modules/job/job.model';
import {findDefaultValueFromFormDataEntryValue} from '@/helpers/select';
import {FormState} from '@/hooks/use-action-state';
import {useMemo, useState} from 'react';

interface JobFormDurationProps {
    state: FormState;
}

export default function JobFormDuration({state}: JobFormDurationProps) {
    const durationOptions: SelectOption[] = Object.keys(JobDurationType).map((key) => ({
        value: key,
        label: JobDurationType[key as keyof typeof JobDurationType],
    }));

    const [durationType, setDurationType] = useState<SelectOption | undefined>(() => findDefaultValueFromFormDataEntryValue(durationOptions, state.formData.get('duration[type]')));

    const isRange = useMemo(() => durationType?.value === JobDurationType.range, [durationType]);
    const isFixed = useMemo(() => durationType?.value === JobDurationType.fixed, [durationType]);

    return (
        <div className="flex flex-col md:flex-row gap-2">
            <CustomSelect
                instanceId="duration[type]"
                name="duration[type]"
                label="Duration Type"
                value={durationType}
                onChange={(newDurationType) => setDurationType(newDurationType || undefined)}
                error={state.error?.errors?.['duration'] || state.error?.errors?.['duration[type]']}
                options={durationOptions}
            />
            {isRange && (
                <>
                    <Input
                        name="duration[minDays]"
                        label="Minimum duration"
                        defaultValue={state.formData.get('duration[minDays]')?.toString()}
                        error={state.error?.errors?.['duration[minDays]']}
                        type="number"
                    />
                    <Input
                        name="duration[maxDays]"
                        label="Maximum duration"
                        defaultValue={state.formData.get('duration[maxDays]')?.toString()}
                        error={state.error?.errors?.['duration[maxDays]']}
                        type="number"
                    />
                </>
            )}
            {isFixed && (
                <Input
                    name="duration[days]"
                    label="Days"
                    defaultValue={state.formData.get('duration[days]')?.toString()}
                    error={state.error?.errors?.['duration[days]']}
                    type="number"
                />
            )}
        </div>
    );
}
