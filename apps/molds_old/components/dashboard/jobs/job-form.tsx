'use client';

import Checkbox from '@/components/dashboard/forms/checkbox';
import CountrySelect from '@/components/dashboard/forms/country-select';
import CustomSelect from '@/components/dashboard/forms/custom-select';
import Fieldset from '@/components/dashboard/forms/fieldset';
import Input from '@/components/dashboard/forms/input';
import MultiStringInputs from '@/components/dashboard/forms/multi-string-inputs';
import Select from '@/components/dashboard/forms/select';
import Submit from '@/components/dashboard/forms/submit';
import Textarea from '@/components/dashboard/forms/textarea';
import JobFormDuration from '@/components/dashboard/jobs/job-form-duration';
import JobFormRecruitmentSteps from '@/components/dashboard/jobs/job-form-recruitment-steps';
import {
    EquipmentPolicy,
    JobCategory,
    JobEmploymentType,
    JobManagementMethodology,
    JobMode,
    JobSeniority,
    JobWorkload,
    SelectJob, UTC_OFFSETS,
} from '@/modules/job/job.model';
import {slugify} from '@/helpers';
import {objectToFromData} from '@/helpers/form-data';
import {findDefaultValueFromFormDataEntryValue} from '@/helpers/select';
import {FormState} from '@/hooks/use-action-state';
import useDashboardActionState from '@/hooks/use-dashboard-action-state';
import Form from 'next/form';
import {ChangeEvent, useState} from 'react';

interface JobFormProps {
    action: (previousState: FormState, formData: FormData) => Promise<FormState>;
    entity?: SelectJob;
}

export default function JobForm({action, entity}: JobFormProps) {
    const initValues = {
        title: entity?.title ?? '',
        alias: entity?.alias ?? '',
        category: entity?.category ?? '',
        seniority: entity?.seniority ?? [],
        workload: entity?.workload ?? [],
        officeLocations: entity?.officeLocations ?? [],
        intro: entity?.intro ?? '',
        description: entity?.description ?? '',
        employmentType: entity?.employmentType ?? [],
        hardSkillRequirements: entity?.hardSkillRequirements ?? [],
        hardSkillsNiceToHave: entity?.hardSkillsNiceToHave ?? [],
        softSkillRequirements: entity?.softSkillRequirements ?? [],
        softSkillsNiceToHave: entity?.softSkillsNiceToHave ?? [],
        responsibilities: entity?.responsibilities ?? [],
        recruitmentSteps: entity?.recruitmentSteps ?? [],
        workingHoursStart: entity?.workingHoursStart ?? '09:00',
        workingHoursEnd: entity?.workingHoursStart ?? '18:00',
        workingHoursUTCOffset: entity?.workingHoursUTCOffset ?? [],
        utcOffsetsRestrictions: entity?.utcOffsetsRestrictions ?? [],
        allowedRegions: entity?.allowedRegions ?? [],
        restrictedRegions: entity?.restrictedRegions ?? [],
        preferredRegions: entity?.preferredRegions ?? [],
        managementMethodology: entity?.managementMethodology ?? '',
        teamSize: entity?.teamSize ? String(entity?.teamSize) : '',
        teamOverview: entity?.teamOverview ? entity?.teamOverview : '',
        teamCulture: entity?.teamCulture ? entity?.teamCulture : '',
        technicalStack: entity?.technicalStack ? entity?.technicalStack : '',
        workflow: entity?.workflow ? entity?.workflow : '',
        technologies: entity?.technologies ?? [],
        equipmentPolicies: entity?.equipmentPolicies ?? [],
        guidelines: entity?.guidelines ?? [],
        legalPolicy: entity?.legalPolicy ? entity?.legalPolicy : '',
        financialPolicy: entity?.financialPolicy ? entity?.financialPolicy : '',
        tags: entity?.tags ?? [],
        metaTitle: entity?.metaTitle ? entity?.metaTitle : '',
        metaDescription: entity?.metaDescription ? entity?.metaDescription : '',
    };

    const {state, formAction} = useDashboardActionState({
        action,
        formData: objectToFromData(initValues),
    });
    const [title, setTitle] = useState(state.formData.get('title')?.toString());
    const [alias, setAlias] = useState(state.formData.get('alias')?.toString());

    const categoryOptions = Object.keys(JobCategory).map((key) => ({
        value: key,
        label: JobCategory[key as keyof typeof JobCategory],
    }));

    const seniorityOptions = Object.keys(JobSeniority).map((key) => ({
        value: key,
        label: JobSeniority[key as keyof typeof JobSeniority],
    }));

    const workloadOptions = Object.keys(JobWorkload).map((key) => ({
        value: key,
        label: JobWorkload[key as keyof typeof JobWorkload],
    }));

    const modeOptions = Object.keys(JobMode).map((key) => ({
        value: key,
        label: JobMode[key as keyof typeof JobMode],
    }));

    const employmentTypeOptions = Object.keys(JobEmploymentType).map((key) => ({
        value: key,
        label: JobEmploymentType[key as keyof typeof JobEmploymentType],
    }));

    const workingHoursUTCOffsetOptions = UTC_OFFSETS.map((offset) => ({
        value: offset,
        label: offset,
    }));

    const managementMethodologyOptions = Object.keys(JobManagementMethodology).map((key) => ({
        value: key,
        label: JobManagementMethodology[key as keyof typeof JobManagementMethodology],
    }));

    const technologiesOptions = ['ReactJS', 'NodeJS', 'Laravel', 'NextJS'].map((technology) => ({
        value: technology,
        label: technology,
    }));

    const equipmentPoliciesOptions = Object.keys(EquipmentPolicy).map((key) => ({
        value: key,
        label: EquipmentPolicy[key as keyof typeof EquipmentPolicy],
    }));

    const guidelinesOptions = [
        'You should have installed Slack on your phone device and your laptop',
        'During the working hours you should be online in company\'s slack and client\'s corporate messenger',
        'You will need to fill the TimeSheet daily',
    ].map((guideline) => ({
        value: guideline,
        label: guideline,
    }));

    const tagsOptions = ['ReactJS', 'NodeJS', 'Laravel', 'NextJS'].map((technology) => ({
        value: technology,
        label: technology,
    }));

    function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
        setAlias(slugify(event.target.value));
    }

    function onChangeAlias(event: ChangeEvent<HTMLInputElement>) {
        setAlias(event.target.value);
    }

    return (
        <Form action={formAction} className="w-full">
            <Fieldset legend="General">
                <Input
                    name="title"
                    label="Title"
                    value={title}
                    onChange={onChangeTitle}
                    error={state.error?.errors?.title}
                    // required
                />
                <Input
                    name="alias"
                    label="Alias"
                    value={alias}
                    onChange={onChangeAlias}
                    error={state.error?.errors?.alias}
                />

                <div className="flex flex-col md:flex-row gap-2">
                    <Select
                        name="category"
                        label="Category"
                        defaultValue={state.formData.get('category')?.toString()}
                        error={state.error?.errors?.category}
                        options={categoryOptions}
                    />

                    <CustomSelect
                        id="seniority"
                        instanceId="seniority"
                        name="seniority[]"
                        label="Seniority"
                        defaultValue={findDefaultValueFromFormDataEntryValue(seniorityOptions, state.formData.get('seniority'))}
                        error={state.error?.errors?.seniority}
                        options={seniorityOptions}
                        isMulti
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <CustomSelect
                        id="workload"
                        instanceId="workload"
                        name="workload[]"
                        label="Workload"
                        defaultValue={findDefaultValueFromFormDataEntryValue(workloadOptions, state.formData.get('workload'))}
                        error={state.error?.errors?.workload}
                        options={workloadOptions}
                        isMulti
                    />
                    <CustomSelect
                        id="mode"
                        instanceId="mode"
                        name="mode[]"
                        label="Mode"
                        defaultValue={findDefaultValueFromFormDataEntryValue(modeOptions, state.formData.get('mode'))}
                        error={state.error?.errors?.mode}
                        options={modeOptions}
                        isMulti
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <CustomSelect
                        instanceId="employmentType"
                        name="employmentType[]"
                        label="Employment Type"
                        defaultValue={findDefaultValueFromFormDataEntryValue(employmentTypeOptions, state.formData.get('employmentType'))}
                        error={state.error?.errors?.employmentType}
                        options={employmentTypeOptions}
                        isMulti
                    />
                    <CountrySelect
                        instanceId="officeLocations"
                        name="officeLocations[]"
                        label="Office Locations"
                        defaultValue={state.formData.get('officeLocations') as unknown as string[]}
                        error={state.error?.errors?.officeLocations}
                        isMulti
                    />
                </div>

                <JobFormDuration state={state}/>

                <div className="flex flex-col md:flex-row gap-2">
                    <Checkbox
                        name="urgentStart"
                        label="Urgent start required?"
                        defaultChecked={state.formData.get('urgentStart') === 'on'}
                        error={state.error?.errors?.urgentStart}
                    />
                    <Input
                        name="startDate"
                        label="Start Date"
                        defaultValue={state.formData.get('startDate')?.toString()}
                        error={state.error?.errors?.startDate}
                        type="date"
                    />
                    <Input
                        name="endDate"
                        label="End Date"
                        defaultValue={state.formData.get('endDate')?.toString()}
                        error={state.error?.errors?.endDate}
                        type="date"
                    />
                    <Input
                        name="workingHoursStart"
                        label="Working Hours Start"
                        defaultValue={state.formData.get('workingHoursStart')?.toString()}
                        error={state.error?.errors?.workingHoursStart}
                        type="time"
                    />
                    <Input
                        name="workingHoursEnd"
                        label="Working Hours End"
                        defaultValue={state.formData.get('workingHoursEnd')?.toString()}
                        error={state.error?.errors?.workingHoursEnd}
                        type="time"
                    />
                    <CustomSelect
                        instanceId="utcOffsetsRestrictions"
                        name="utcOffsetsRestrictions[]"
                        label="UTC Offset Restrictions"
                        defaultValue={findDefaultValueFromFormDataEntryValue(workingHoursUTCOffsetOptions, state.formData.get('utcOffsetsRestrictions'))}
                        error={state.error?.errors?.utcOffsetsRestrictions}
                        options={workingHoursUTCOffsetOptions}
                        isMulti
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <CountrySelect
                        instanceId="allowedRegions"
                        name="allowedRegions[]"
                        label="Allowed Regions"
                        defaultValue={state.formData.get('allowedRegions') as unknown as string[]}
                        error={state.error?.errors?.allowedRegions}
                        isMulti
                    />
                    <CountrySelect
                        instanceId="restrictedRegions"
                        name="restrictedRegions[]"
                        label="Restricted Regions"
                        defaultValue={state.formData.get('restrictedRegions') as unknown as string[]}
                        error={state.error?.errors?.restrictedRegions}
                        isMulti
                    />
                    <CountrySelect
                        instanceId="preferredRegions"
                        name="preferredRegions[]"
                        label="Preferred Regions"
                        defaultValue={state.formData.get('preferredRegions') as unknown as string[]}
                        error={state.error?.errors?.preferredRegions}
                        isMulti
                    />
                </div>

                <Textarea
                    name="intro"
                    label="Intro"
                    defaultValue={state.formData.get('intro')?.toString()}
                    error={state.error?.errors?.intro}
                    rows={5}
                />
                <Textarea
                    name="description"
                    label="Description"
                    defaultValue={state.formData.get('description')?.toString()}
                    error={state.error?.errors?.description}
                    rows={5}
                />

                <MultiStringInputs
                    initValues={state.formData.getAll('hardSkillRequirements') as string[]}
                    errors={state.error?.errors ?? {}}
                    name="hardSkillRequirements"
                    label="Hard Skills Requirements"
                    addBtnLabel="Add Skill"
                />

                <MultiStringInputs
                    initValues={state.formData.getAll('hardSkillsNiceToHave') as string[]}
                    errors={state.error?.errors ?? {}}
                    name="hardSkillsNiceToHave"
                    label="Hard Skills Nice To Have"
                    addBtnLabel="Add Skill"
                />

                <MultiStringInputs
                    initValues={state.formData.getAll('softSkillRequirements') as string[]}
                    errors={state.error?.errors ?? {}}
                    name="softSkillRequirements"
                    label="Soft Skills Requirements"
                    addBtnLabel="Add Skill"
                />

                <MultiStringInputs
                    initValues={state.formData.getAll('softSkillsNiceToHave') as string[]}
                    errors={state.error?.errors ?? {}}
                    name="softSkillsNiceToHave"
                    label="Soft Skills Nice To Have"
                    addBtnLabel="Add Skill"
                />

                <MultiStringInputs
                    initValues={state.formData.getAll('responsibilities') as string[]}
                    errors={state.error?.errors ?? {}}
                    name="responsibilities"
                    label="Responsibilities"
                    addBtnLabel="Add Responsibility"
                />

                <JobFormRecruitmentSteps state={state}/>

                <Textarea
                    name="aboutEmployer"
                    label="About Employer"
                    defaultValue={state.formData.get('aboutEmployer')?.toString()}
                    error={state.error?.errors?.aboutEmployer}
                    rows={5}
                />

                <div className="flex flex-col md:flex-row gap-2">
                    <Select
                        name="managementMethodology"
                        label="Management Methodology"
                        defaultValue={state.formData.get('managementMethodology')?.toString()}
                        error={state.error?.errors?.managementMethodology}
                        options={managementMethodologyOptions}
                    />

                    <Input
                        name="teamSize"
                        label="Team Size"
                        defaultValue={state.formData.get('teamSize')?.toString()}
                        error={state.error?.errors?.teamSize}
                    />
                </div>

                <Textarea
                    name="teamOverview"
                    label="Team Overview"
                    defaultValue={state.formData.get('teamOverview')?.toString()}
                    error={state.error?.errors?.teamOverview}
                    rows={5}
                />

                <Textarea
                    name="teamCulture"
                    label="Team Culture"
                    defaultValue={state.formData.get('teamCulture')?.toString()}
                    error={state.error?.errors?.teamCulture}
                    rows={5}
                />

                <Textarea
                    name="technicalStack"
                    label="Technical Stack"
                    defaultValue={state.formData.get('technicalStack')?.toString()}
                    error={state.error?.errors?.technicalStack}
                    rows={5}
                />

                <Textarea
                    name="workflow"
                    label="Workflow"
                    defaultValue={state.formData.get('workflow')?.toString()}
                    error={state.error?.errors?.workflow}
                    rows={5}
                />

                <CustomSelect
                    instanceId="technologies"
                    name="technologies[]"
                    label="Technologies"
                    defaultValue={findDefaultValueFromFormDataEntryValue(technologiesOptions, state.formData.get('technologies'))}
                    error={state.error?.errors?.technologies}
                    options={technologiesOptions}
                    isMulti
                />

                <CustomSelect
                    instanceId="equipmentPolicies"
                    name="equipmentPolicies[]"
                    label="Equipment Policies"
                    defaultValue={findDefaultValueFromFormDataEntryValue(equipmentPoliciesOptions, state.formData.get('equipmentPolicies'))}
                    error={state.error?.errors?.equipmentPolicies}
                    options={equipmentPoliciesOptions}
                    isMulti
                />

                <CustomSelect
                    instanceId="guidelines"
                    name="guidelines[]"
                    label="Guidelines"
                    defaultValue={findDefaultValueFromFormDataEntryValue(guidelinesOptions, state.formData.get('guidelines'))}
                    error={state.error?.errors?.guidelines}
                    options={guidelinesOptions}
                    isMulti
                />

                <Textarea
                    name="legalPolicy"
                    label="Legal Policy"
                    defaultValue={state.formData.get('legalPolicy')?.toString()}
                    error={state.error?.errors?.legalPolicy}
                    rows={5}
                />

                <Textarea
                    name="financialPolicy"
                    label="Financial Policy"
                    defaultValue={state.formData.get('financialPolicy')?.toString()}
                    error={state.error?.errors?.financialPolicy}
                    rows={5}
                />

                <CustomSelect
                    instanceId="tags"
                    name="tags[]"
                    label="Tags"
                    defaultValue={findDefaultValueFromFormDataEntryValue(tagsOptions, state.formData.get('tags'))}
                    error={state.error?.errors?.tags}
                    options={tagsOptions}
                    isMulti
                />

                <Input
                    name="metaTitle"
                    label="Meta Title"
                    defaultValue={state.formData.get('metaTitle')?.toString()}
                    error={state.error?.errors?.metaTitle}
                />

                <Textarea
                    name="metaDescription"
                    label="Meta Description"
                    defaultValue={state.formData.get('metaDescription')?.toString()}
                    error={state.error?.errors?.metaDescription}
                    rows={5}
                />
            </Fieldset>
            <Submit/>
        </Form>

    );
}
