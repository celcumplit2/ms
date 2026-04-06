'use client';

import Button from '@/components/dashboard/common/button';
import Checkbox from '@/components/dashboard/forms/checkbox';
import Input from '@/components/dashboard/forms/input';
import Label from '@/components/dashboard/forms/label';
import Textarea from '@/components/dashboard/forms/textarea';
import {RecruitmentStep} from '@/modules/job/job.model';
import {formDataToObject} from '@/helpers/form-data';
import {FormState} from '@/hooks/use-action-state';
import {IconTrash} from '@tabler/icons-react';
import {set} from 'lodash';
import {ChangeEventHandler, MouseEvent, useState} from 'react';

interface JobFormRecruitmentStepsProps {
    state: FormState;
}

export default function JobFormRecruitmentSteps({state}: JobFormRecruitmentStepsProps) {
    const [recruitmentSteps, setRecruitmentSteps] = useState<Record<string, RecruitmentStep>>(() => {
        const data = formDataToObject(state.formData);

        return data.recruitmentSteps as Record<string, RecruitmentStep> ?? {};
    });

    function addRecruitmentStep(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        setRecruitmentSteps({
            ...recruitmentSteps,
            [Date.now()]: {
                name: '',
                duration: '30',
                description: '',
                optional: false,
            },
        });
    }

    function deleteRecruitmentStep(time: string) {
        return (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {[time]: _, ...rest} = recruitmentSteps;

            setRecruitmentSteps(rest);
        };
    }

    const onChangeInput = (uuid: string, name: string): ChangeEventHandler<HTMLInputElement> => (event) => {
        const newRecruitmentSteps = {...recruitmentSteps};

        if (event.target.type === 'checkbox') {
            set(newRecruitmentSteps, [uuid, name], event.target.checked);
        } else {
            set(newRecruitmentSteps, [uuid, name], event.target.value);
        }

        setRecruitmentSteps(newRecruitmentSteps);
    }

    const onChangeTextArea = (uuid: string, name: string): ChangeEventHandler<HTMLTextAreaElement> => (event) => {
        const newRecruitmentSteps = {...recruitmentSteps};

        set(newRecruitmentSteps, [uuid, name], event.target.value);

        setRecruitmentSteps(newRecruitmentSteps);
    }

    return (
        <div className="flex flex-col gap-2">
            <Label hasError={false}>Recruitment Steps</Label>
            {Object.keys(recruitmentSteps).map((key) => (
                <div
                    key={`recruitmentSteps-${key}`}
                    className="flex gap-2"
                >
                    <div className="flex flex-col gap-2 flex-1">
                        <div className="flex flex-col md:flex-row gap-2">
                            {key}
                            <Input
                                name={`recruitmentSteps[${key}][name]`}
                                value={recruitmentSteps[key].name}
                                error={state.error?.errors?.[`recruitmentSteps[${key}][name]`]}
                                onChange={onChangeInput(key, 'name')}
                            />
                            <Input
                                type="number"
                                name={`recruitmentSteps[${key}][duration]`}
                                value={recruitmentSteps[key].duration}
                                error={state.error?.errors?.[`recruitmentSteps[${key}][duration]`]}
                                onChange={onChangeInput(key, 'duration')}
                            />
                            <Checkbox
                                value="1"
                                name={`recruitmentSteps[${key}][optional]`}
                                checked={recruitmentSteps[key].optional}
                                error={state.error?.errors?.[`recruitmentSteps[${key}][optional]`]}
                                label="Is Optional"
                                onChange={onChangeInput(key, 'optional')}
                            />
                        </div>
                        <Textarea
                            name={`recruitmentSteps[${key}][description]`}
                            value={recruitmentSteps[key].description}
                            error={state.error?.errors?.[`recruitmentSteps[${key}][description]`]}
                            onChange={onChangeTextArea(key, 'description')}
                        />
                    </div>

                    <Button
                        color="danger"
                        size="sm"
                        onClick={deleteRecruitmentStep(key)}
                    >
                        <IconTrash/>
                    </Button>
                </div>
            ))}
            <Button
                color="success"
                size="sm"
                onClick={addRecruitmentStep}
            >
                Add Recruitment Step
            </Button>
        </div>
    );
}
