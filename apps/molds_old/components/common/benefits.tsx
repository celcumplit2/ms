import styles from '@/styles/scss/common/benefits.module.scss';
import {clsx} from 'clsx';
import Image from 'next/image';
import {DetailedHTMLProps, HTMLAttributes} from 'react';

interface BenefitsProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    icon: string;
    subHeading: string;
    title: string;
    description?: string;
    benefits: Array<{
        icon: string;
        title: string;
        subTitle?: string;
        description: string;
    }>;
}

export default function Benefits({icon, subHeading, title, description, benefits, className, ...restProps}: BenefitsProps) {
    return (
        <section className={clsx(styles['benefits'], className)} {...restProps}>
            <hgroup>
                <p><Image src={ icon } alt="Benefits Icon" width="56" height="56" /></p>
                <p>{subHeading}</p>
                <h2>{title}</h2>
                {description ? (<p>{description}</p>) : ''}
            </hgroup>
            <div>
                {benefits.map((benefit) => (
                    <article key={benefit.title}>
                        <Image src={benefit.icon} alt="Abstract Icon" width="62" height="62" />
                        <h3>{benefit.title}</h3>
                        {benefit.subTitle ? (<p><i>{benefit.subTitle}</i></p>) : ''}
                        <p>{benefit.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
