import ApplyForm from '@/components/careers/apply-form';
import Breadcrumbs, {BreadcrumbsLink} from '@/components/common/breadcrumbs';
import {BASE_URL} from '@/config';
import {JOB_ARCHIVE_LIFETIME, JOB_LIFETIME} from '@/modules/job/job.config';
import {JobMode, JobSeniority, JobWorkload, SelectJob} from '@/modules/job/job.model';
import {JOB_CATEGORY_MAP, JOB_MANAGEMENT_METHODOLOGY_MAP, JOB_MODE_MAP, JOB_SENIORITY_MAP, JOB_WORKLOAD_MAP} from '@/helpers/mapping';
import {readJobByAlias} from '@/modules/job/job.service';
import styles from '@/styles/scss/careers/careers-job-page.module.scss';
import {PageProps} from '@/types/pages';
import {addDays, format} from 'date-fns';
import type {Metadata} from 'next';
import Image from 'next/image';
import {notFound, permanentRedirect, RedirectType} from 'next/navigation';
import {cache} from 'react';
import {JobPosting, WithContext} from 'schema-dts';

export const dynamic = 'force-static';

export const revalidate = 14400; // 4 hours.

export async function generateStaticParams() {
    return [];
}

function isJobArchived(job: SelectJob): boolean {
    return job.publishedAt.getTime() + (JOB_ARCHIVE_LIFETIME * 24 * 60 * 60 * 1000) < Date.now();
}

function isJobClosed(job: SelectJob): boolean {
    const time = job.publishedAt.getTime();

    return time + (JOB_LIFETIME * 24 * 60 * 60 * 1000) < Date.now() && time + (JOB_ARCHIVE_LIFETIME * 24 * 60 * 60 * 1000) > Date.now();
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const alias = (await params).alias;
    const getCachedJob = cache(async (a: string) => readJobByAlias({alias: a}));
    const job = await getCachedJob(alias);

    if (job && isJobArchived(job)) {
        return permanentRedirect('/careers', RedirectType.replace);
    }

    return {
        title: job ? job.metaTitle : '',
        description: job ? job.metaDescription : '',
        alternates: {
            canonical: job ? `/careers/${job.alias}` : '',
        },
        openGraph: {
            title: job?.title,
            description: job?.intro,
            url: `/careers/${job?.alias}`,
            locale: 'en_US',
            type: 'article',
        },
    };
}

function jobWorkloadMap(workload: keyof typeof JobWorkload): string {
    if (workload === JobWorkload.partTime) {
        return 'PART_TIME';
    }

    return 'FULL_TIME';
}

function getApplicantLocationRequirements(countries: string[]) {
    const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

    return countries.map((country): {'@type': 'Country', name: string} => ({
        '@type': 'Country',
        name: regionNames.of(country)!,
    }));
}

export default async function JobPage({params}: PageProps) {
    const alias = (await params).alias;
    const getCachedJob = cache(async (a: string) => readJobByAlias({alias: a}));
    const job = await getCachedJob(alias);

    if (!job) {
        notFound();
    }

    if (isJobArchived(job)) {
        return permanentRedirect('/careers', RedirectType.replace);
    }

    const jobIsClosed = isJobClosed(job);
    const defaultCountries = ['MD', 'RO', 'PL', 'BG', 'RS', 'HR'];

    const breadcrumbs: BreadcrumbsLink[] = [
        {label: 'Careers', href: '/careers'},
        {label: job.title, href: `/careers/${job.alias}`},
    ];

    const jsonLd: WithContext<JobPosting> = {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        '@id': new URL(`/careers/${job.alias}`, BASE_URL).toString(),
        mainEntityOfPage: new URL(`/careers/${job.alias}`, BASE_URL).toString(),
        hiringOrganization: {
            '@type': 'Organization',
            '@id': new URL('#organization', BASE_URL).toString(),
        },
        identifier: {
            '@type': 'PropertyValue',
            name: 'MoldStud',
            value: job.id,
        },
        title: job.title,
        name: job.title,
        datePosted: format(job.publishedAt, 'yyyy-MM-dd'),
        validThrough: format(addDays(job.publishedAt, JOB_LIFETIME), 'yyyy-MM-dd'),
        description: job.intro,
        employmentType: job.workload.length > 0 ? jobWorkloadMap(job.workload[0]) : undefined,
        qualifications: job.softSkillRequirements.length > 0 ? job.softSkillRequirements.join(', ') : '',
        responsibilities: job.responsibilities.length > 0 ? job.responsibilities.join(', ') : undefined,
        workHours: job.workload.length > 0 ? (job.workload[0] === JobWorkload.partTime ? '20 hours per week' : '40 hours per week') : undefined,
        directApply: true,
        jobImmediateStart: job.urgentStart,
        jobLocationType: job.mode.length > 0 ? (job.mode[0] === JobMode.remote ? 'TELECOMMUTE' : undefined) : undefined,
        applicantLocationRequirements: job.allowedRegions.length > 0
            ? getApplicantLocationRequirements(job.allowedRegions)
            : (job.preferredRegions.length > 0
                    ? getApplicantLocationRequirements(job.preferredRegions)
                    : getApplicantLocationRequirements(defaultCountries)
            ),
    };

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <header className={styles['header']}>
                <div>
                    <hgroup>
                        <p>{JOB_CATEGORY_MAP[job.category]}</p>
                        {job.seniority.map((seniority) => (
                            <p key={`job-seniority-${seniority}`}>{JOB_SENIORITY_MAP[seniority]}</p>
                        ))}
                        <h1>{job.title}</h1>
                    </hgroup>
                    {jobIsClosed && (
                        <>
                            <h2>Status: Closed</h2>
                            <p className={styles['job-closed']}>This position is closed and no longer accepting applications.</p>
                        </>
                    )}
                    <p>{job.intro}</p>
                    <div>
                        <p>
                            <Image src="/images/careers/icon-clock.svg" alt="Clock Icon" width="20" height="20" loading="lazy"/>
                            {job.workload.map((workload, key) => (
                                <span key={`job-workload-${workload}`}>{JOB_WORKLOAD_MAP[workload]}{key < job.workload.length - 1 ? ', ' : ''}</span>
                            ))}
                        </p>
                        <p>
                            <Image src="/images/careers/icon-luggage.svg" alt="Luggage Icon" width="20" height="20" loading="lazy"/>
                            {job.mode.map((mode, key) => (
                                <span key={`job-mode-${mode}`}>{JOB_MODE_MAP[mode]}{key < job.mode.length - 1 ? ', ' : ''}</span>
                            ))}
                        </p>
                    </div>
                </div>
                {!jobIsClosed && (<a href="#apply-form-anchor">Apply Now</a>)}
            </header>
            <article className={styles['content']}>
                <h2>MoldStud’s Commitment To Growth And Excellence</h2>
                <p>
                    At MoldStud, we&apos;re dedicated to nurturing talent and fostering a culture where innovation thrives. As
                    a {JOB_SENIORITY_MAP[job.seniority[0]]} {job.title}, you&apos;ll find yourself at the heart of a collaborative team that values
                    your growth, supports your professional development, and encourages you to explore new horizons in technology. We believe in
                    pushing the boundaries of digital solutions, and we want passionate individuals like you to join us on this exciting journey.
                </p>
                <h2>What You’ll Be Doing As A {job.seniority} {job.title} At MoldStud</h2>
                <div dangerouslySetInnerHTML={{__html: job.description}}></div>

                {job.hardSkillRequirements.length > 0 && (
                    <>
                        <h2>We Need You To Have Some Hard Skills</h2>
                        <ul>
                            {job.hardSkillRequirements.map((skill) => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </>
                )}

                {job.softSkillRequirements.length > 0 && (
                    <>
                        <h2>We Need You To Have Some Soft Skills</h2>
                        <ul>
                            {job.softSkillRequirements.map((skill) => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </>
                )}

                <h2>When, With Who, And How You’ll Be Working</h2>
                <dl>
                    {job.workingHoursUTCOffset && (
                        <div>
                            <dt>
                                <Image src="/images/careers/icon-timezone.svg" alt="Timezone Icon" width="62" height="62" loading="lazy"/>
                                <h6>UTC{job.workingHoursUTCOffset}</h6>
                            </dt>
                            <dd>Your primary working timezone</dd>
                        </div>
                    )}
                    {job.workingHoursStart && job.workingHoursEnd && job.workingHoursUTCOffset && (
                        <div>
                            <dt>
                                <Image src="/images/careers/icon-working-hours.svg" alt="Working Hours Icon" width="62" height="62" loading="lazy"/>
                                <h6>{job.workingHoursStart.slice(0, 5)}-{job.workingHoursEnd.slice(0, 5)} UTC{job.workingHoursUTCOffset}</h6>
                            </dt>
                            <dd>Your primary working hours</dd>
                        </div>
                    )}
                    {job.managementMethodology && (
                        <div>
                            <dt>
                                <Image src="/images/careers/icon-management.svg" alt="Management Icon" width="62" height="62" loading="lazy"/>
                                <h6>{JOB_MANAGEMENT_METHODOLOGY_MAP[job.managementMethodology]}</h6>
                            </dt>
                            <dd>Your primary project management methodology</dd>
                        </div>
                    )}
                    {job.teamSize && (
                        <div>
                            <dt>
                                <Image src="/images/careers/icon-team-size.svg" alt="Profile Icon" width="62" height="62" loading="lazy"/>
                                <h6>{job.teamSize}</h6>
                            </dt>
                            <dd>Your project’s team size</dd>
                        </div>
                    )}
                </dl>

                {job.recruitmentSteps.length > 0 && (
                    <>
                        <h2>What The Recruitment Process Looks Like</h2>
                        <dl>
                            {job.recruitmentSteps.map((step) => (
                                <div key={step.description}>
                                    <dt>
                                        <Image src="/images/careers/icon-working-hours.svg" alt="Working Hours Icon" width="62" height="62"
                                               loading="lazy"/>
                                        <h6>{step.duration} Minutes {step.optional ? '' : (<span>*</span>)}</h6>
                                    </dt>
                                    <dd>{step.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </>
                )}

                <section>
                    <h2>Why You Should Apply</h2>
                    <p>Joining MoldStud as a {job.seniority.map((seniority) => JobSeniority[seniority]).join(' or ')} {job.title} means becoming part
                        of a vibrant team that values innovation and
                        problem-solving.
                        Here, your expertise will contribute to cutting-edge projects that enhance digital accessibility and empower users worldwide.
                        MoldStud is
                        committed to your professional growth, offering a collaborative environment where your ideas lead to meaningful advancements
                        in technology.
                        Apply now to take your career to the next level with a company that&apos;s as invested in your development as it is in
                        creating
                        transformative
                        digital solutions.</p>
                    {!jobIsClosed && (<a href="#apply-form-anchor">Apply Now</a>)}
                </section>
                <h2>By Joining Our Team, You’ll Grow As A Specialist</h2>
                <ul>
                    <li>Innovate at the forefront of accessible tech solutions.</li>
                    <li>Grow with continuous learning and professional development opportunities.</li>
                    <li>Collaborate with a team of experts dedicated to making a global impact.</li>
                    <li>Enjoy a culture that values work-life balance and employee well-being.</li>
                    <li>Shape the future of technology in a company that champions creativity and innovation.</li>
                </ul>
            </article>

            {!jobIsClosed && (
                <div id="apply-form-anchor">
                    <ApplyForm
                        jobId={String(job.id)}
                        jobUrl={new URL(`/careers/${job.alias}`, BASE_URL).toString()}
                        jobTitle={job.title}
                    />
                </div>
            )}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </>
    );
}
