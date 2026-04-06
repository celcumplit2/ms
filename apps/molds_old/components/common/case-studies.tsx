import styles from '@/styles/scss/services/case-studies.module.scss';
import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {clsx} from 'clsx';

interface CaseStudy {
    title: string;
    category: string;
    challenge: string;
    solution: string;
    outcome: string;
}

interface CaseStudiesProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    title?: string;
    subHeading: string;
    caseStudies: CaseStudy[];
}

export default function CaseStudies({title, subHeading, caseStudies, className, ...restProps}: CaseStudiesProps) {
    return (
        <section className={clsx(styles['case-studies'], className)} {...restProps}>
            <hgroup>
                <p>{title ?? 'Case Studies'}</p>
                <h2>{subHeading}</h2>
            </hgroup>
            {caseStudies.map((study) => (
                <article key={`case-study-${study.title}`}>
                    <h3>{study.title}</h3>
                    <p>{study.category}</p>
                    <h4>Challenge:<br/>{study.challenge}</h4>
                    <div>
                        <p>
                            <strong>MoldStud Solution:</strong>
                            <br/>
                            {study.solution}
                        </p>
                        <p>
                            <strong>Outcome:</strong>
                            <br/>
                            {study.outcome}
                        </p>
                    </div>
                </article>
            ))}
        </section>
    );
}
